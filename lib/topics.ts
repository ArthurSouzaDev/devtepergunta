export type Category =
  | "Infra"
  | "Desenvolvimento"
  | "Suporte"
  | "Linux"
  | "Windows"
  | "Geral";

export type Topic = {
  id: string;
  title: string;
  category: Category;
  hint: string;
};

export const CATEGORIES: Category[] = [
  "Infra",
  "Desenvolvimento",
  "Suporte",
  "Linux",
  "Windows",
  "Geral",
];

export const TOPICS: Topic[] = [
  // Infra
  { id: "infra-01", category: "Infra", title: "Por que o Kubernetes existe, afinal?", hint: "Orquestração de containers e o problema que resolve." },
  { id: "infra-02", category: "Infra", title: "Docker vs. máquina virtual", hint: "Isolamento, overhead e quando usar cada um." },
  { id: "infra-03", category: "Infra", title: "O que é um CDN e como ele deixa o site rápido", hint: "Cache na borda e latência." },
  { id: "infra-04", category: "Infra", title: "Load balancer em 1 minuto", hint: "Round robin, health checks e alta disponibilidade." },
  { id: "infra-05", category: "Infra", title: "Infraestrutura como código com Terraform", hint: "Estado, planos e reprodutibilidade." },
  { id: "infra-06", category: "Infra", title: "O que significa 99,9% de uptime", hint: "SLA, SLO e quanto de indisponibilidade cabe no mês." },
  { id: "infra-07", category: "Infra", title: "Backup 3-2-1", hint: "Cópias, mídias diferentes e uma fora do local." },
  { id: "infra-08", category: "Infra", title: "Serverless: não tem servidor mesmo?", hint: "Função como serviço e cold start." },

  // Desenvolvimento
  { id: "dev-01", category: "Desenvolvimento", title: "Git rebase vs. merge", hint: "Histórico linear versus histórico fiel." },
  { id: "dev-02", category: "Desenvolvimento", title: "TypeScript vale a pena num projeto pequeno?", hint: "Custo inicial versus bugs evitados." },
  { id: "dev-03", category: "Desenvolvimento", title: "O que é uma API REST", hint: "Recursos, verbos HTTP e status codes." },
  { id: "dev-04", category: "Desenvolvimento", title: "GraphQL resolve o problema do REST?", hint: "Over-fetching, under-fetching e trade-offs." },
  { id: "dev-05", category: "Desenvolvimento", title: "Testes unitários versus testes de integração", hint: "Velocidade, confiança e manutenção." },
  { id: "dev-06", category: "Desenvolvimento", title: "O que é injeção de dependência", hint: "Acoplamento e testabilidade." },
  { id: "dev-07", category: "Desenvolvimento", title: "Por que o JavaScript é single-threaded e ainda assim assíncrono", hint: "Event loop, call stack e fila de tarefas." },
  { id: "dev-08", category: "Desenvolvimento", title: "Clean code: nomes importam mais do que você acha", hint: "Legibilidade como ferramenta de manutenção." },
  { id: "dev-09", category: "Desenvolvimento", title: "Feature flags explicadas", hint: "Lançar código sem lançar funcionalidade." },
  { id: "dev-10", category: "Desenvolvimento", title: "Monolito não é vilão", hint: "Quando o monolito modular é a escolha certa." },

  // Suporte
  { id: "sup-01", category: "Suporte", title: "Como abrir um bom chamado de suporte", hint: "Passos para reproduzir, prints e contexto." },
  { id: "sup-02", category: "Suporte", title: "Por que reiniciar o computador ainda resolve tanta coisa", hint: "Cache, processos presos e memória." },
  { id: "sup-03", category: "Suporte", title: "O que é um ticket de nível 1, 2 e 3", hint: "Escalonamento e responsabilidades." },
  { id: "sup-04", category: "Suporte", title: "Como explicar termos técnicos para quem não é da área", hint: "Analogias do dia a dia." },
  { id: "sup-05", category: "Suporte", title: "Senha forte versus senha fácil de lembrar", hint: "Gerenciadores de senha e MFA." },
  { id: "sup-06", category: "Suporte", title: "O que é phishing e como identificar", hint: "Sinais de alerta em e-mails e links." },
  { id: "sup-07", category: "Suporte", title: "Diagnóstico de rede: ping, traceroute e DNS", hint: "Como separar problema local de problema externo." },

  // Linux
  { id: "lin-01", category: "Linux", title: "Tudo é arquivo no Linux", hint: "Dispositivos, processos e o modelo de arquivos." },
  { id: "lin-02", category: "Linux", title: "Permissões rwx e chmod em 60 segundos", hint: "Dono, grupo e outros." },
  { id: "lin-03", category: "Linux", title: "O que é uma distribuição Linux", hint: "Kernel, pacotes e ambiente gráfico." },
  { id: "lin-04", category: "Linux", title: "systemd: o que ele faz no boot", hint: "Serviços, units e journalctl." },
  { id: "lin-05", category: "Linux", title: "Para que serve o comando grep", hint: "Busca de texto e expressões regulares básicas." },
  { id: "lin-06", category: "Linux", title: "Swap: por que o Linux usa disco como memória", hint: "Paginação e desempenho." },
  { id: "lin-07", category: "Linux", title: "Dotfiles: por que tanta gente versiona configuração", hint: "Reprodutibilidade de ambiente." },

  // Windows
  { id: "win-01", category: "Windows", title: "O que é o registro do Windows", hint: "Chaves, valores e cuidados ao editar." },
  { id: "win-02", category: "Windows", title: "WSL: Linux dentro do Windows", hint: "Como funciona e para que serve." },
  { id: "win-03", category: "Windows", title: "Diferença entre Windows Home e Pro", hint: "Recursos de domínio, BitLocker e Hyper-V." },
  { id: "win-04", category: "Windows", title: "Para que serve o PowerShell", hint: "Objetos em vez de texto e automação." },
  { id: "win-05", category: "Windows", title: "Atualizações do Windows: por que demoram", hint: "Componentes, reinícios e pacotes cumulativos." },
  { id: "win-06", category: "Windows", title: "Gerenciador de tarefas explicado", hint: "CPU, memória, disco e processos em segundo plano." },

  // Geral
  { id: "ger-01", category: "Geral", title: "Como funciona a criptografia de ponta a ponta", hint: "Chaves públicas e privadas, sem jargão." },
  { id: "ger-02", category: "Geral", title: "O que é inteligência artificial generativa", hint: "Modelos, previsão e limites." },
  { id: "ger-03", category: "Geral", title: "Cookies: o que guardam e por que pedem consentimento", hint: "Primeira e terceira parte, e privacidade." },
  { id: "ger-04", category: "Geral", title: "Como a internet encontra um site", hint: "DNS, IP e roteamento." },
  { id: "ger-05", category: "Geral", title: "O que é código aberto de verdade", hint: "Licenças e comunidade." },
  { id: "ger-06", category: "Geral", title: "Por que a bateria do celular degrada", hint: "Ciclos de carga e química da bateria." },
  { id: "ger-07", category: "Geral", title: "Edge computing em termos simples", hint: "Processar perto de onde os dados nascem." },
];
