// Visualization template examples for users

export const visualizationTemplates = {
  heatmap: `// Heatmap Example
function generateHeatmap() {
  const size = 25;
  const data = [];
  
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      // Create wave pattern
      const value = Math.sin(i / 3) * Math.cos(j / 3) * 10;
      row.push(value);
    }
    data.push(row);
  }
  
  return data;
}

const heatmapData = generateHeatmap();
console.log("Heatmap generated!");`,

  surface3d: `// 3D Surface Plot Example
function generate3DSurface() {
  const size = 30;
  const surface = [];
  
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      // Mathematical surface
      const x = (i - size/2) / 5;
      const y = (j - size/2) / 5;
      const z = Math.sin(Math.sqrt(x*x + y*y));
      row.push(z * 10);
    }
    surface.push(row);
  }
  
  return surface;
}

const surface3d = generate3DSurface();
console.log("3D surface ready!");`,

  scatter: `// Scatter Plot Example
function generateScatterData() {
  const n = 100;
  const data = {
    x: [],
    y: [],
    colors: []
  };
  
  for (let i = 0; i < n; i++) {
    const x = Math.random() * 10;
    const y = x * 2 + Math.random() * 2;
    data.x.push(x);
    data.y.push(y);
    data.colors.push(x * 10);
  }
  
  return data;
}

const scatterData = generateScatterData();
console.log("Scatter plot generated!");`,

  combined: `// Combined Visualization Example
function generateMultiPlot() {
  // Generate heatmap
  const heatmap = [];
  for (let i = 0; i < 20; i++) {
    const row = [];
    for (let j = 0; j < 20; j++) {
      row.push(Math.sin(i/2) * Math.cos(j/2) * 10);
    }
    heatmap.push(row);
  }
  
  // Generate 3d surface
  const surface = [];
  for (let i = 0; i < 30; i++) {
    const row = [];
    for (let j = 0; j < 30; j++) {
      const x = (i - 15) / 5;
      const y = (j - 15) / 5;
      row.push(Math.sin(Math.sqrt(x*x + y*y)) * 10);
    }
    surface.push(row);
  }
  
  return { heatmap, surface };
}

const multiPlot = generateMultiPlot();
console.log("Multiple plots ready!");`
};

export const getTemplateByKeyword = (code: string): string | null => {
  const lowerCode = code.toLowerCase();
  
  if (lowerCode.includes("heatmap")) {
    return "heatmap";
  } else if (lowerCode.includes("3d") || lowerCode.includes("surface")) {
    return "surface3d";
  } else if (lowerCode.includes("scatter")) {
    return "scatter";
  } else if (lowerCode.includes("combined") || lowerCode.includes("multi")) {
    return "combined";
  }
  
  return null;
};
