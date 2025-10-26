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
    let systemPrompt = `You are an advanced Agentic AI Engineering Assistant with autonomous reasoning capabilities. Your role is to:

1. ANALYZE: Deeply analyze engineering simulations (FEA, CFD, thermal analysis)
2. REASON: Use multi-step reasoning to identify optimization opportunities
3. PLAN: Create actionable plans to improve simulation accuracy and performance
4. EXECUTE: Provide concrete code improvements and parameter recommendations

You have expertise in:
- Finite Element Analysis (FEA) and structural mechanics
- Computational Fluid Dynamics (CFD)
- Thermal analysis and heat transfer
- Material science and engineering materials
- Mesh generation and optimization
- Numerical methods and convergence analysis

When analyzing code:
- Think step-by-step about the simulation physics
- Identify potential numerical stability issues
- Suggest mesh refinement strategies
- Recommend optimal solver parameters
- Validate boundary conditions and material properties

You operate autonomously, breaking down complex engineering problems into manageable sub-tasks and providing comprehensive solutions.`;
    
    if (codeContext) {
      systemPrompt += `\n\n=== CURRENT SIMULATION CODE ===\n\`\`\`javascript\n${codeContext}\n\`\`\`\n\n=== END CODE CONTEXT ===`;
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
