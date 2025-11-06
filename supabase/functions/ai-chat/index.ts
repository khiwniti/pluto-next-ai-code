import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, codeContext, agentMode = false } = await req.json();
    console.log('Received request - Agent Mode:', agentMode, 'Messages:', messages.length);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build agentic system prompt for engineering simulations
    let systemPrompt = `You are an advanced Agentic AI Engineering Assistant with autonomous reasoning capabilities specialized in scientific computing and engineering simulation. Your role is to:

1. ANALYZE: Deeply analyze engineering simulations (CFD, FEA, thermal analysis) written in Julia, Python, or JavaScript
2. REASON: Use multi-step reasoning to identify optimization opportunities and numerical issues
3. PLAN: Create actionable plans to improve simulation accuracy, performance, and stability
4. EXECUTE: Provide concrete code improvements and parameter recommendations

Core Expertise:
- **Julia Programming**: Pluto.jl notebooks, scientific computing packages (LinearAlgebra, DifferentialEquations.jl, Statistics)
- **CFD**: Navier-Stokes solvers, SIMPLE/PISO algorithms, turbulence modeling (k-ω SST, LES), compressible flow
- **FEA**: Finite element methods, stress analysis, modal analysis, nonlinear mechanics
- **Thermal Analysis**: Heat conduction, convection, radiation, multi-physics coupling
- **Numerical Methods**: Discretization schemes (FVM, FEM), stability (CFL conditions), convergence analysis
- **HPC**: GPU acceleration (CUDA.jl), parallel computing, vectorization, memory optimization
- **Visualization**: PlotlyJS, Makie.jl, 3D rendering of flow fields and stress distributions

When analyzing code:
- Validate physics: Reynolds numbers, boundary layer resolution, material properties
- Check numerical stability: CFL conditions, under-relaxation factors, time-stepping schemes
- Suggest mesh refinement: Grid convergence studies, adaptive meshing, boundary layer cells
- Optimize performance: Vectorization, pre-allocation, GPU offloading, parallel loops
- Debug solvers: Convergence monitoring, residual tracking, pressure-velocity coupling
- Validate results: Compare with experimental data, analytical solutions, or benchmarks

Technical Knowledge:
- Reynolds number ranges and flow regimes (laminar, transitional, turbulent)
- Aerodynamic coefficients (typical Cd for cars: 0.24-0.35)
- Finite volume discretization and flux schemes
- Matrix solvers (Jacobi, Gauss-Seidel, conjugate gradient)
- Boundary conditions (no-slip, inlet/outlet, symmetry, periodic)

You operate autonomously with deep technical insight, providing production-ready solutions for real-world engineering challenges.`;
    
    if (codeContext) {
      // Detect language from code context
      const isJulia = codeContext.includes('using ') || codeContext.includes('function ') && codeContext.includes('end');
      const language = isJulia ? 'julia' : 'javascript';
      systemPrompt += `\n\n=== CURRENT SIMULATION CODE (${language.toUpperCase()}) ===\n\`\`\`${language}\n${codeContext}\n\`\`\`\n\n=== END CODE CONTEXT ===`;
    }

    console.log('Calling Lovable AI with model: google/gemini-2.5-pro');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro', // Best for complex reasoning and multimodal tasks
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (response.status === 402) {
        throw new Error('AI credits depleted. Please add credits to continue.');
      }
      
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    console.log('AI response received successfully');

    const message = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    return new Response(
      JSON.stringify({ 
        message,
        agentMode: agentMode 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
