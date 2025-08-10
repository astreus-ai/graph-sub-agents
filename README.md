# Graph + Sub-Agents

This project demonstrates how to combine Graph workflows with Sub-Agent coordination for sophisticated hierarchical task distribution using the Astreus AI framework.

## Features

- **Hierarchical Task Distribution**: Combine graphs with sub-agent coordination
- **Specialized Agent Teams**: Different agents for different capabilities
- **Intelligent Delegation**: Automatic task assignment based on agent expertise
- **Parallel Processing**: Concurrent execution across multiple agents

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Edit the `.env` file and add your API keys

## Running

```bash
npm run dev
```

## Code Explanation

The example creates a market analysis project that combines graph workflows with sub-agent coordination for complex task distribution.

## Environment Variables

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
DB_URL=sqlite://./astreus.db
```

## More Information

- [Astreus AI Documentation](https://astreus.org/docs)
- [Graph Features](https://astreus.org/docs/framework/graph)
- [Sub-Agent Features](https://astreus.org/docs/framework/sub-agents)
- [GitHub Repository](https://github.com/astreus-ai/astreus)