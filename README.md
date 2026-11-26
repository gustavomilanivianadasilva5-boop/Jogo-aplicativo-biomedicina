# estudo·biomédico

Aplicação educativa, sem etapa de build, para explorar visualmente a imunidade pulmonar e **Mycobacterium tuberculosis** em múltiplas escalas. O modo local não requer dependências; o cooperativo online carrega o cliente Supabase sob demanda. Abra `index.html` em um navegador moderno com WebGL habilitado.

## Recursos

- Cena principal renderizada em WebGL, com uma camada Canvas 2D para rótulos e partículas.
- Navegação anatômica por quatro níveis — pulmão, lóbulo, bronquíolo e alvéolo — com roda do mouse e controles `+`/`−`; as vistas intracelulares permanecem no painel de observação da infecção.
- Movimento de câmera por WASD/setas, joystick multitoque e minimapa; durante a patrulha, os mesmos controles conduzem a célula escolhida por um mapa gerado deterministicamente com 1.000 alvéolos conectados nos pulmões esquerdo e direito.
- Patrulha alveolar interativa e cooperativa: cada participante pode escolher e controlar sua própria célula, percorrer passagens entre os dois pulmões, acompanhar bacilos no minimapa e simular mitoses esquemáticas até dez macrófagos, seis neutrófilos ou seis plasmócitos.
- Desafio progressivo: a disseminação entre alvéolos conectados acelera conforme novos focos surgem, bacilos no citosol podem replicar no modelo e a HUD acompanha os alvéolos afetados; o cenário limita o crescimento a 120 bacilos para manter a partida controlável.
- Ativação individual e em qualquer ordem dos sete módulos TLR2 → MyD88 → NF-κB → CYP27B1 → VDR → CAMP → LL-37; o painel diferencia módulos preparados do sinal que percorre a sequência conceitual.
- Patrulha alveolar que internaliza bacilos em fagossomos; com os sete módulos e a terapia fágica simbólica ativos, o modelo percorre etapas de parede, citoplasma e fagolisossomo para removê-los, enquanto a persistência sem controle pode levar ao escape e à ruptura celular.
- Vistas interativas do alvéolo, fagossomo, citosol do macrófago e do neutrófilo, parede micobacteriana, citoplasma bacteriano, fagolisossomo e granuloma, com contagens de bacilos livres e intracelulares.
- Neutrófilos fagocitam bacilos para fagossomos próprios; alguns podem ser degradados no modelo e outros escapar ao citosol, causar dano e romper a célula, liberando bacilos. O macrófago continua sujeito às suas próprias regras intracelulares.
- Formação esquemática de granuloma após sinalização inflamatória, com agregado de macrófagos no foco e organização periférica de linfócitos; a maturação pode ser observada durante a patrulha.
- Defesa cooperativa local para até três participantes no mesmo dispositivo, com seletor de papel também acessível sobre a cena durante a patrulha: macrófago, neutrófilo e plasmócito são controláveis; mitose, formação de NET e liberação de IgG/IgA são ações manuais do papel correspondente. O linfócito T helper atua automaticamente como apoio didático não controlável.
- Modo cooperativo online experimental para até três dispositivos, com criação de sala por código/link, posições e ações compartilhadas em tempo real via Supabase Realtime; o anfitrião mantém a simulação autoritativa.
- Sinalização por IL-1β, TNF, CXCL8, IL-6 e IL-12; controles diretos para recrutar até seis neutrófilos e seis plasmócitos, além da colaboração B–T helper e produção de anticorpos.
- Neutrófilos podem fagocitar bacilos próximos e formar NETs temporárias que os aprisionam, reduzindo a dispersão modelada; fagocitose não significa remoção imediata. Plasmócitos geram anticorpos que podem recrutar complemento/MAC contra bacilos extracelulares.
- Animações conceituais de lise osmótica por MAC, estresse oxidativo, tráfego fagossomal e degradação intracelular. A ruptura de macrófagos ou neutrófilos pode liberar bacilos no modelo; se todos os macrófagos forem perdidos, aparece **Reiniciar infecção**.
- Arsenal do macrófago com oito controles independentes: IFN-γ/JAK–STAT1, V-ATPase, LAP, xenofagia seletiva, NOX2/ROS, iNOS/RNS, cGAS–STING e NLRP3/caspase-1. ROS/RNS podem produzir uma animação de estresse oxidativo e módulos selecionados aceleram moderadamente a progressão didática no fagossomo; isso não prediz eficácia biológica.
- Pulmões bilaterais e agrupamentos de alvéolos redesenhados com membrana fina, septos e capilares esquemáticos, acompanhados por movimento e pulsação suaves.
- Enciclopédia integrada com estruturas celulares, eixo TLR2 → MyD88 → NF-κB → CYP27B1 → VDR → CAMP → LL-37, apresentação de antígenos por MHC-II, envelope micobacteriano e genes selecionados.
- Módulo de fago–bactéria e CRISPR tipo III-A estritamente conceitual.
- Exportação da cena composta para PNG ou JPEG pelo menu **Exportar figura**.
- Botão **Instalar no PC** para abrir a instalação do PWA no Edge/Chrome e botão **Enviar para Samsung** para compartilhar o link pelo menu nativo do dispositivo.
- Compartilhamento com alternativa de copiar o link e instruções para instalar no Samsung Android pelo Chrome ou Samsung Internet.

## Instalar no computador

O PWA precisa ser servido por um endereço HTTPS (ou por `localhost`); abrir `index.html` diretamente como arquivo não permite instalação nem cache offline. No Windows, abra o PowerShell nesta pasta e execute `powershell -ExecutionPolicy Bypass -File .\run-local.ps1`; deixe a janela do servidor aberta. No Microsoft Edge ou Google Chrome, use **Instalar no PC** ou abra o menu do navegador e escolha **Instalar Estudo Biomédico**. Também é possível publicar a pasta em um host HTTPS, como GitHub Pages, e instalar a partir do endereço publicado.

Use **Enviar para Samsung** para abrir o compartilhamento do dispositivo e enviar o link ao celular. No Samsung Android, abra o link no Chrome ou Samsung Internet e escolha **Instalar aplicativo** ou **Adicionar à tela inicial** no menu do navegador. Na primeira visita, aguarde o carregamento para que o service worker armazene os arquivos; depois a interface principal pode abrir sem conexão. Não é um instalador `.exe` nem um APK: a instalação é gerenciada pelo navegador.

## Configurar partidas cooperativas online

O modo online usa canais públicos do Supabase Realtime; não requer tabelas nem contas de jogador. Para ativá-lo:

1. Crie um projeto em [supabase.com](https://supabase.com/) e copie a **Project URL** e a chave pública **publishable** (`sb_publishable_...`) em **Project Settings → API Keys**.
2. No arquivo `multiplayer-config.js`, preencha `supabaseUrl` e `supabasePublishableKey` com esses dois valores.
3. Publique os arquivos atualizados no GitHub Pages. O jogo online não funciona pelo endereço `localhost` para amigos em outras redes; use o endereço público HTTPS do Pages.
4. No jogo, abra **Cooperativo online → Conectar → Criar sala e convidar** e envie o link copiado ao seu amigo. O link sempre aponta para o GitHub Pages público, mesmo se o anfitrião criou a sala em `localhost`. Abrir o convite tenta conectar automaticamente; se ele recebeu apenas o código, deve digitá-lo e tocar em **Entrar**. A sala é pública para qualquer pessoa com link/código enquanto o anfitrião permanecer conectado. O primeiro jogador é o anfitrião/macrófago; os próximos recebem neutrófilo e linhagem B.

A chave pública fica visível no aplicativo publicado e isso é esperado; **nunca** coloque a chave `service_role` ou outra chave secreta em `multiplayer-config.js`. A sala usa um código aleatório, mas qualquer pessoa com o link/código pode entrar. O anfitrião precisa manter o jogo aberto e conectado: se sair, a simulação dos convidados pausa. O cliente Supabase JavaScript é carregado de `esm.sh` quando alguém tenta criar ou entrar em uma sala; portanto, o modo online exige internet mesmo que a interface principal já esteja armazenada para uso offline.

## Escopo científico

Ilustrações, escalas, partículas, proliferação celular e relações são esquemáticas e não estão em escala. A ativação dos módulos em ordem livre é uma interação de ensino: a transmissão representada continua respeitando a ordem da via. Os oito módulos do arsenal são selecionáveis individualmente para comparação qualitativa; seus efeitos no andamento do cenário são regras do jogo, não previsões quantitativas. LAP e xenofagia são processos distintos; ROS/RNS podem ser neutralizadas ou moduladas pelo bacilo, e NLRP3/caspase-1 representa inflamação/processamento de citocinas, não uma via bactericida direta. O IFN-γ/JAK–STAT1 é um sinal recebido pelo macrófago, não uma via autônoma universal.

O movimento intracelular mostrado representa transporte vesicular e tráfego após dano/escape fagossomal; *M. tuberculosis* não é apresentada como bactéria flagelada ou nadando no citosol. Escape, replicação intracelular e morte de macrófagos ou neutrófilos são possibilidades dependentes da cepa, do hospedeiro e do contexto, não um destino inevitável. No neutrófilo, o cenário usa uma chance aleatória de escape e um limiar de dano para ilustrar desfechos distintos; esses parâmetros não são probabilidades ou tempos biológicos. A disseminação acelerada, limite de 120 bacilos e limiar de replicação são parâmetros de dificuldade, não estimativas biológicas. A ruptura celular libera bacilos no modelo. O granuloma é representado como organização didática de macrófagos e linfócitos: sua arquitetura, necrose e efeito sobre a infecção variam, podendo haver contenção ou persistência bacteriana; não é uma barreira esterilizante garantida.

O botão **Mitose** ilustra divisão local de macrófagos e limita a equipe a dez células apenas para fins de jogabilidade; esse teto e a velocidade da animação não representam limites nem taxas fisiológicas.

A terapia fágica representa 1.000 partículas simbólicas, não milhares de agentes simulados individualmente nem uma intervenção validada contra tuberculose. A entrada de elementos fágicos no citoplasma e a formação de poros atribuída à LL-37 são metáforas hipotéticas do cenário, não mecanismos ou resultados garantidos em *M. tuberculosis*. A retenção inicial no fagossomo, a progressão de defesa e a liberação de bacilos por ruptura celular são regras de jogo, não previsões biológicas. A remoção de todos os bacilos é apenas o desfecho deste cenário finito, não demonstra nem promete esterilização pulmonar real. Os conteúdos são introdutórios, não exaustivos, e não devem ser interpretados como protocolo experimental, simulação quantitativa ou orientação clínica. A atividade dos genes e vias varia com o contexto biológico.
O modo cooperativo é uma atribuição didática de controles, não uma representação de um ensaio clínico ou de anatomia funcional em tempo real. Recrutar plasmócitos diretamente é um atalho de jogabilidade, não diferenciação observada de linfócitos B. NETs são representadas como estruturas de aprisionamento e não como eliminação garantida; fagocitose, escape, dano e ruptura neutrofílica são resultados simplificados e variáveis no cenário, sem estimar probabilidades biológicas. A interação B–T helper, a produção de anticorpos, o MAC, as lisas apresentadas e o espalhamento de focos são simplificações conceituais. Em particular, a simulação de lise por MAC não implica suscetibilidade confiável de *M. tuberculosis* ao complemento; esses efeitos não comprovam neutralização nem eliminação do agente.

### Leituras científicas relacionadas

As vias foram incluídas como tópicos de exploração, não como reprodução de um mecanismo único ou consensual:

- [cGAS–STING e autofagia em infecções por *M. tuberculosis* (2024)](https://pubmed.ncbi.nlm.nih.gov/38977406/).
- [Antagonismo micobacteriano da fagocitose associada a LC3 (LAP) por PDIM (2024)](https://pubmed.ncbi.nlm.nih.gov/39242815/).
- [Imunidade treinada de macrófagos alveolares (2025)](https://pubmed.ncbi.nlm.nih.gov/40652587/).
