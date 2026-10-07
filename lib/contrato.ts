export interface ContratoVariaveis {
  paciente: {
    nome: string
    cpf?: string
    data_nascimento?: string
    endereco?: string
  }
  clinica: {
    nome: string
    cnpj?: string
    endereco?: string
    telefone?: string
  }
  procedimentos?: string
  valor_total?: number
  valor_parcelas?: number
  data?: string
  profissional?: string
}

export function preencherContrato(template: string, vars: ContratoVariaveis): string {
  let conteudo = template

  // Replace paciente variables
  conteudo = conteudo.replace(/{{paciente\.nome}}/g, vars.paciente.nome)
  conteudo = conteudo.replace(/{{paciente\.cpf}}/g, vars.paciente.cpf || '')
  conteudo = conteudo.replace(/{{paciente\.data_nascimento}}/g, vars.paciente.data_nascimento || '')
  conteudo = conteudo.replace(/{{paciente\.endereco}}/g, vars.paciente.endereco || '')

  // Replace clinica variables
  conteudo = conteudo.replace(/{{clinica\.nome}}/g, vars.clinica.nome)
  conteudo = conteudo.replace(/{{clinica\.cnpj}}/g, vars.clinica.cnpj || '')
  conteudo = conteudo.replace(/{{clinica\.endereco}}/g, vars.clinica.endereco || '')
  conteudo = conteudo.replace(/{{clinica\.telefone}}/g, vars.clinica.telefone || '')

  // Replace other variables
  conteudo = conteudo.replace(/{{procedimentos}}/g, vars.procedimentos || '')
  conteudo = conteudo.replace(/{{valor_total}}/g, vars.valor_total ? formatarMoeda(vars.valor_total) : '')
  conteudo = conteudo.replace(/{{valor_parcelas}}/g, vars.valor_parcelas ? formatarMoeda(vars.valor_parcelas) : '')
  conteudo = conteudo.replace(/{{data}}/g, vars.data || new Date().toLocaleDateString('pt-BR'))
  conteudo = conteudo.replace(/{{profissional}}/g, vars.profissional || '')

  return conteudo
}

export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

export const TEMPLATE_CONTRATO_GERAL = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS ODONTOLÓGICOS

CONTRATANTE: {{paciente.nome}}
CPF: {{paciente.cpf}}
Data de Nascimento: {{paciente.data_nascimento}}
Endereço: {{paciente.endereco}}

CONTRATADA: {{clinica.nome}}
CNPJ: {{clinica.cnpj}}
Endereço: {{clinica.endereco}}
Telefone: {{clinica.telefone}}

PROFISSIONAL RESPONSÁVEL: {{profissional}}

OBJETO DO CONTRATO:
Prestação de serviços odontológicos conforme descrito abaixo:
{{procedimentos}}

VALOR:
Valor Total: {{valor_total}}

CONDIÇÕES GERAIS:
1. O paciente compromete-se a comparecer às consultas agendadas
2. Em caso de falta, avise com 24 horas de antecedência
3. Siga as orientações do profissional para melhor resultado
4. Pagamento conforme acordo estabelecido
5. Responsabilidade do paciente: higiene e cuidados pós-procedimento

RESPONSABILIDADE DO CONSULTÓRIO:
1. Realizar procedimentos com técnica adequada
2. Utilizar materiais de qualidade
3. Respeitar protocolos de biossegurança
4. Fornecer orientações para saúde bucal

PRIVACIDADE E DADOS:
O paciente autoriza o armazenamento de dados pessoais e fotos do tratamento
para fins de documentação clínica, conforme Lei LGPD.

Data: {{data}}
Assinatura do Paciente: ___________________________
Assinatura do Profissional: ___________________________
`

export const TEMPLATE_CONTRATO_ORTODONTIA = `
CONTRATO DE TRATAMENTO ORTODÔNTICO

CONTRATANTE: {{paciente.nome}}
CPF: {{paciente.cpf}}
Data de Nascimento: {{paciente.data_nascimento}}

CONTRATADA: {{clinica.nome}}
PROFISSIONAL: {{profissional}}

OBJETO:
Tratamento ortodôntico completo com aparelho {{procedimentos}}

VALOR E FORMAS DE PAGAMENTO:
Valor Total do Tratamento: {{valor_total}}
Valor da Consulta de Manutenção: {{valor_parcelas}}
Periodicidade: Mensal (aproximadamente 4-6 semanas entre consultas)

DURAÇÃO ESTIMADA:
24 a 36 meses (sujeito a alterações conforme resposta do paciente)

OBRIGAÇÕES DO PACIENTE:
1. Comparecer às consultas mensais de manutenção
2. Manter higiene impecável dos dentes e aparelho
3. Evitar alimentos duros, pegajosos e alimentos que podem danificar o aparelho
4. Usar os elásticos conforme orientado (se aplicável)
5. Comunicar qualquer desconforto ou quebra do aparelho

OBRIGAÇÕES DO CONSULTÓRIO:
1. Realizar procedimentos com técnica e materialidade adequadas
2. Realizar trocas de arcos e elásticos conforme planejamento
3. Acompanhamento radiográfico periódico
4. Orientações sobre higiene e cuidados

FALTA EM CONSULTAS:
- Falta sem aviso prévio: Será cobrada taxa de 50% da consulta
- Atraso superior a 15 minutos: Consulta pode ser remarcada
- Avisado com antecedência: Sem custo adicional

RESCISÃO DO CONTRATO:
Caso o paciente deseje rescindir o tratamento:
- Paciente recebe orientações para continuação com outro profissional
- Documentação (radiografias, fotos) entregue em até 10 dias
- Valores pagos não são reembolsáveis

RETENÇÃO:
Ao final do tratamento:
- Uso obrigatório de aparelho de contenção (mínimo 2 anos)
- Consultas periódicas de acompanhamento (semestrais)

CONSENTIMENTO:
O paciente autoriza fotos e documentação para fins clínicos e educacionais.
Dados pessoais armazenados conforme LGPD.

Data: {{data}}
Assinatura do Paciente: ___________________________
Assinatura do Responsável (se menor): ___________________________
Assinatura do Profissional: ___________________________
`
