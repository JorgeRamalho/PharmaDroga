export type InfoModalKey =
  'sobre' | 'carreiras' | 'sustentabilidade' | 'ajuda' | 'trocas' | 'contato';

export interface InfoModalContent {
  title: string;
  body: string;
}

export const infoModalContent: Record<InfoModalKey, InfoModalContent> = {
  sobre: {
    title: 'Sobre a Pharmadroga',
    body: `
      <p>A Pharmadroga é uma rede de drogarias presente em todo o Brasil, unindo cuidado farmacêutico de excelência a preços acessíveis.</p>
      <p>Com mais de 500 lojas, oferecemos atendimento humanizado, produtos de qualidade e as melhores condições de pagamento do mercado.</p>
      <p><em>Conteúdo demonstrativo — projeto portfólio.</em></p>
    `,
  },
  carreiras: {
    title: 'Trabalhe conosco',
    body: `
      <p>Faça parte de uma equipe que cuida da saúde de milhões de brasileiros. Buscamos talentos em farmácia, atendimento, logística e gestão.</p>
      <ul>
        <li>Vagas em lojas e centros de distribuição</li>
        <li>Plano de carreira e capacitação contínua</li>
        <li>Ambiente inclusivo e colaborativo</li>
      </ul>
      <p>Envie seu currículo para <strong>carreiras@pharmadroga.com.br</strong> (demonstrativo).</p>
    `,
  },
  sustentabilidade: {
    title: 'Sustentabilidade',
    body: `
      <p>Comprometidos com o meio ambiente e a comunidade, a Pharmadroga investe em descarte correto de medicamentos, redução de plásticos e eficiência energética nas lojas.</p>
      <p>Participe das nossas campanhas de coleta em unidades selecionadas.</p>
    `,
  },
  ajuda: {
    title: 'Central de ajuda',
    body: `
      <p>Encontre respostas sobre pedidos, entregas, receitas e programas de fidelidade.</p>
      <ul>
        <li>Como rastrear meu pedido</li>
        <li>Política de medicamentos controlados</li>
        <li>Clube Pharmadroga e cupons</li>
      </ul>
      <p>Atendimento 24h pelo chat na loja online (demonstrativo).</p>
    `,
  },
  trocas: {
    title: 'Trocas e devoluções',
    body: `
      <p>Você pode trocar ou devolver produtos em até 7 dias, conforme o Código de Defesa do Consumidor, apresentando nota fiscal e embalagem original.</p>
      <p>Medicamentos abertos ou fora da validade não são elegíveis para devolução, salvo defeito de fabricação.</p>
    `,
  },
  contato: {
    title: 'Fale conosco',
    body: `
      <p><strong>SAC:</strong> 0800 000 0000 (demonstrativo)</p>
      <p><strong>E-mail:</strong> atendimento@pharmadroga.com.br</p>
      <p><strong>Horário:</strong> Segunda a sábado, 8h às 22h</p>
      <p>Ou visite a loja mais próxima em <a href="#lojas">nossa seção de lojas</a>.</p>
    `,
  },
};
