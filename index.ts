import { config } from 'dotenv';
import { Agent, Graph } from '@astreus-ai/astreus';

// Load environment variables
config();

async function main() {
  // Create specialized sub-agents
  const researcher = await Agent.create({
    name: 'ResearchSpecialist',
    model: 'gpt-4o',
    systemPrompt: 'You conduct thorough research and gather comprehensive information.',
    knowledge: true,
    memory: true
  });

  const analyst = await Agent.create({
    name: 'DataAnalyst', 
    model: 'gpt-4o',
    systemPrompt: 'You analyze data and provide actionable insights.',
    useTools: true
  });

  const writer = await Agent.create({
    name: 'ContentWriter',
    model: 'claude-3-5-sonnet-20241022',
    systemPrompt: 'You create compelling, well-structured content.',
    vision: true
  });

  // Create main coordinator agent with sub-agents
  const coordinator = await Agent.create({
    name: 'ProjectCoordinator',
    model: 'gpt-4o',
    systemPrompt: 'You coordinate complex projects using specialized sub-agents.',
    subAgents: [researcher, analyst, writer]
  });

  // Create graph with sub-agent awareness
  const projectGraph = new Graph({
    name: 'Market Analysis Project',
    subAgentAware: true,
    maxConcurrency: 2
  }, coordinator);

  // Add tasks that leverage sub-agents
  const researchTask = projectGraph.addTaskNode({
    name: 'Market Research',
    prompt: 'Research the AI healthcare market, including key players, market size, and growth trends',
    useSubAgents: true,
    subAgentDelegation: 'auto'
  });

  const analysisTask = projectGraph.addTaskNode({
    name: 'Data Analysis',
    prompt: 'Analyze the research data and identify key opportunities and challenges',
    dependencies: [researchTask],
    useSubAgents: true,
    subAgentCoordination: 'parallel'
  });

  const reportTask = projectGraph.addTaskNode({
    name: 'Executive Report',
    prompt: 'Create a comprehensive executive report with recommendations',
    dependencies: [analysisTask],
    useSubAgents: true
  });

  // Execute the graph with intelligent sub-agent coordination
  const result = await projectGraph.run();
  
  // Display results
  console.log('Project completed:', result.success);
  console.log(`Tasks completed: ${result.completedNodes}/${result.completedNodes + result.failedNodes}`);
  console.log(`Duration: ${result.duration}ms`);
  
  // Display task results
  if (result.results) {
    console.log('\nTask Results:');
    for (const [nodeId, nodeResult] of Object.entries(result.results)) {
      console.log(`\n${nodeId}:`, nodeResult);
    }
  }
  
  // Get the final report from the last task
  const finalReport = result.results?.[reportTask];
  if (finalReport) {
    console.log('\n=== Final Executive Report ===');
    console.log(finalReport);
  }
}

main().catch(console.error);