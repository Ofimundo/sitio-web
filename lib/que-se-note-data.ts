// Base de datos de Que Se Note
export interface Competencia {
  id_competencia: number;
  tipo: "Transversales" | "Específicas" | string;
  categoria: string;
  competencia: string;
}

export interface Person {
  id: number;
  nombre: string;
  foto: string;
  empresa: string;
  area: string;
  cargo: string;
  competencias: Competencia[];
}

export interface Reconocimiento {
  id_reconocimiento: number;
  fecha: string;
  dimension: "SE NOTÓ" | "DESTACÓ" | "DEJÓ HUELLA" | "MARCÓ LA DIFERENCIA" | string;
  destinatarioId: number;
  remitente: string;
  competencia: string;
  categoria: string;
  mensaje: string;
}

export const descripcionesCompetencias: Record<string, string> = {
  "Orientación a resultados": "Fija sus objetivos en concordancia con los objetivos estratégicos de la organización. Trabaja para mejorar su desempeño introduciendo los cambios necesarios en la órbita de su accionar.",
  "Iniciativa": "Trabaja sin supervisión constante y no se amilana con los problemas.",
  "Perseverancia": "Tiene una actitud positiva frente a situaciones adversas. Pide ayuda para solucionar temas difíciles sin desanimarse.",
  "Discriminar": "Es capaz de discriminar y enfocarse en las tareas que van a permitirle alcanzar sus objetivos, aquellas que mayor impacto generarán.",
  "Temple": "Aprende de sus errores. Analiza su desempeño para comprender los fracasos y mejorar su accionar futuro.",
  "Responsabilidad": "Cumple los plazos tomando todos los márgenes de tolerancia previstos y la calidad necesaria para cumplir el objetivo.",
  "Adaptabilidad al cambio": "Evalúa y observa la situación objetivamente y puede reconocer la validez del punto de vista de otros, utilizando dicha información de manera selectiva para modificar su accionar siempre con flexibilidad.",
  "Aprendizaje Continuo": "Se esfuerza por adquirir nuevas habilidades y conocimientos. Busca y analiza proactivamente información pertinente para planificar un curso de acción.",
  "Innovación": "Aplica/recomienda soluciones para resolver problemas o situaciones utilizando su experiencia en otras similares.",
  "Trabajo en equipo": "Solicita la opinión al resto del grupo, valorando las ideas y experiencias de los demás, con una actitud abierta para aprender, promoviendo la colaboración, aunque existan puntos de vista diferentes.",
  "Apoyo a compañeros": "Participa con entusiasmo en actividades de entrenamiento riguroso, compartiendo sus avances con los otros y promoviendo actitudes similares en otros.",
  "Orientación a Cliente interno y externo": "Identifica las necesidades del cliente interno y externo; en ocasiones se anticipa a ellas aportando soluciones a la medida de sus requerimientos. Demuestra interés en atender a los clientes con rapidez, diagnostica correctamente la necesidad y plantea soluciones adecuadas.",
  "Autocontrol": "Maneja efectivamente sus emociones. Evita las manifestaciones de las emociones fuertes o el estrés sostenido; sigue funcionando bien o responde constructivamente a pesar del estrés.",
  "Integridad": "Desafía a otros a actuar con valores y creencias. Está orgulloso de ser honrado. Es honesto en las relaciones con los clientes. Da a todos un trato equitativo.",
  "Franqueza, Confiabilidad Integridad": "Establece relaciones basadas en el respeto mutuo y la confianza. Asume la responsabilidad de sus propios errores. Sus acciones y actitudes son coherentes con su discurso.",
  "Calidad del Trabajo": "Conoce y aplica adecuadamente todos los temas relacionados con su especialidad como para cumplir su función.",
  "Profundidad en el conocimiento de los productos": "Investiga y se mantiene informado sobre los productos y servicios actuales, obteniendo ventajas con los beneficios que cada uno de ellos ofrece. Conoce los productos de la competencia.",
  "Liderazgo – Coach": "Orienta a las personas en una dirección determinada, fija objetivos y realiza un adecuado seguimiento brindando feedback a los distintos integrantes. Enseña y lidera a través del ejemplo constante. Enfrenta situaciones complejas a través de la conversación directa y respetuosa.",
  "Pensamiento Conceptual": "Puede explicar claramente problemas o temas complejos, situaciones y oportunidades. Se basa en la experiencia pasada y en sus conocimientos",
  "Desarrollo de las Personas": "Para facilitar el aprendizaje, explica cómo y por qué las cosas se hacen de una determinada manera. Se asegura por distintos medios de que se hayan comprendido bien sus explicaciones e instrucciones. Entrega Contexto.",
  "Desarrollo de los equipos": "Desarrolla su equipo con conocimiento de las herramientas y del valor estratégico de los recursos humanos para una mejor gestión de negocios. Crea instancias de esparcimiento y camaradería, las lidera y fomenta la construcción de equipo.",
  "Empowerment II": "Se posiciona como líder. Se asegura que los otros se identifiquen y participen en su misión, objetivos, clima, tono y políticas. Es el modelo de actuación para los demás; a todos les transmite credibilidad. Se asegura que se cumplan las metas del grupo.",
  "Dinamismo": "Demuestra dinamismo y energía trabajando duro sin que su nivel de rendimiento se vea afectado. Transmite energía a su grupo y a su accionar.",
  "Negociación": "Llega a acuerdos satisfactorios en el mayor número de negociaciones a su cargo en concordancia con los objetivos de la organización.",
  "Conciencia Organizacional y Relacionamiento": "Comprende, describe, construye  y utiliza las relaciones de poder e influencia (stackeholders) existentes dentro de la organización interna y del cliente, con un sentido claro de cómo influir en ellas.",
  "Presentación de Soluciones Comerciales": "Desarrolla y presenta una solución que agrega valor al cliente, haciendo hincapié en los beneficios que su propuesta creará en el negocio del cliente. Utiliza adecuadamente estrategias de persuasión.",
  "Resolución de Problemas Comerciales": "Desarrolla una solución sobre la base de su conocimiento de los productos, la información disponible, su experiencia previa y la incorporación de servicios.",
  "Credibilidad Técnica": "Resuelve problemas de clientes relacionados con los aspectos técnicos de los productos, sobre la base del conocimiento de sus aspectos positivos y negativos. Establece contactos formales e informales con usuarios finales de los productos de la compañía.",
  "Levantamiento de Insights": "Levanta problemáticas vistas en clientes, susceptibles de oportunidad de mejora (Levanta Insights) y las comunica y propone resolver a través de nuevos productos o servicios.",
  "Habilidad Analítica": "Analiza información e identifica problemas coordinando datos relevantes. Tiene mucha capacidad y habilidad para analizar, organizar y presentar datos y establecer conexiones relevantes entre datos numéricos. Interpreta la información disponible y descubre insights para el desarrollo del negocio.",
  "Preocupación por el Orden y la Claridad": "Realiza el seguimiento del trabajo de los demás vigilando su calidad para asegurarse de que se siguen los procedimientos establecidos. Lleva un registro detallado de las actividades propias y la de los demás. Se preocupa por dejar claras las normas y procedimientos empleados.",
  "Búsqueda de información": "Aborda personalmente el esclarecimiento de una situación o problema cuando lo normal es no hacerlo. Se encuentra con las personas más cercanas al problema y les hace preguntas. Recurre a personas que no están personalmente involucradas en la situación o problema.",
  "Preocupación por el orden y la claridad": "Realiza el seguimiento del trabajo su calidad para asegurarse de que se siguen los procedimientos establecidos. Lleva un registro detallado de las actividades propias y la de los demás. Se preocupa por dejar claras las normas y procedimientos empleados.",
  "Desarrollo Estratégico de RRHH": "Realiza una proyección de posibles necesidades de recursos humanos considerando distintos escenarios a largo plazo. Tiene un papel activo en la definición de las políticas en función del análisis estratégico.",
  "Capacidad de Entender a los demás": "Comprende los intereses de los demás modificando su propia conducta dentro de las normas de la organización y los ayuda a resolver problemas que le plantean o él mismo observa.",
  "Impacto e Influencia": "Utiliza estrategias complejas y a medida de la situación y frecuentemente crea cadenas de influencia indirecta. Tiene capacidad para influir o persuadir a alguien para que éste influya a su vez a otros, generando cadenas de influencia entre personas claves."
};

export const peopleList: Person[] = [
  {
    "id": 1,
    "nombre": "Lucy Kauer",
    "foto": "/que-se-note/img/ofimundo/LucyKauer.png",
    "empresa": "Ofimundo",
    "area": "Comercial",
    "cargo": "Client Success Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 2,
    "nombre": "Macarena Allende",
    "foto": "/que-se-note/img/ofimundo/MacarenaAllende.png",
    "empresa": "Ofimundo",
    "area": "Comercial",
    "cargo": "Client Success Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 3,
    "nombre": "Daniela Valdés",
    "foto": "/que-se-note/img/ofimundo/DanielaValdes.png",
    "empresa": "Ofimundo",
    "area": "Comercial",
    "cargo": "Client Success Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 4,
    "nombre": "Michelle Medina",
    "foto": "/que-se-note/img/ofimundo/MichelleMedina.png",
    "empresa": "Ofimundo",
    "area": "Comercial",
    "cargo": "Client Success Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 5,
    "nombre": "Maria José Guzman",
    "foto": "/que-se-note/img/ofimundo/MariaJoseGuzman.png",
    "empresa": "Ofimundo",
    "area": "Comercial",
    "cargo": "Client Success Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 6,
    "nombre": "Rodrigo Stuckrath",
    "foto": "/que-se-note/img/ofimundo/RodrigoStuckrath.png",
    "empresa": "Ofimundo",
    "area": "Comercial",
    "cargo": "Client Success Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 7,
    "nombre": "Rhody Santibañez",
    "foto": "/que-se-note/img/ofimundo/RhodySantibanez.png",
    "empresa": "Ofimundo",
    "area": "Comercial",
    "cargo": "Sales Regional Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 8,
    "nombre": "Yaritza Carrasco",
    "foto": "/que-se-note/img/ofimundo/YaritzaCarrasco.png",
    "empresa": "Ofimundo",
    "area": "Comercial",
    "cargo": "Especialista de Licitaciones",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 9,
    "nombre": "Herminia Tapia",
    "foto": "/que-se-note/img/ofimundo/HerminiaTapia.png",
    "empresa": "Ofimundo",
    "area": "Administración y Finanzas",
    "cargo": "Jefa de Contratos, Facturación y Cobranza",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      },
      {
        "id_competencia": 18,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Liderazgo – Coach"
      },
      {
        "id_competencia": 19,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Pensamiento Conceptual"
      },
      {
        "id_competencia": 20,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de las Personas"
      },
      {
        "id_competencia": 21,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de los equipos"
      },
      {
        "id_competencia": 22,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Empowerment II"
      }
    ]
  },
  {
    "id": 10,
    "nombre": "Pablo Avendaño",
    "foto": "/que-se-note/img/ofimundo/PabloAvendano.png",
    "empresa": "Ofimundo",
    "area": "Administración y Finanzas",
    "cargo": "Encargado de Control de Gestión",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      },
      {
        "id_competencia": 18,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Liderazgo – Coach"
      },
      {
        "id_competencia": 19,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Pensamiento Conceptual"
      },
      {
        "id_competencia": 20,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de las Personas"
      },
      {
        "id_competencia": 21,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de los equipos"
      },
      {
        "id_competencia": 22,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Empowerment II"
      }
    ]
  },
  {
    "id": 11,
    "nombre": "César Retamal",
    "foto": "/que-se-note/img/ofimundo/CesarRetamal.png",
    "empresa": "Ofimundo",
    "area": "Administración y Finanzas",
    "cargo": "Contador General",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      },
      {
        "id_competencia": 18,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Liderazgo – Coach"
      },
      {
        "id_competencia": 19,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Pensamiento Conceptual"
      },
      {
        "id_competencia": 20,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de las Personas"
      },
      {
        "id_competencia": 21,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de los equipos"
      },
      {
        "id_competencia": 22,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Empowerment II"
      }
    ]
  },
  {
    "id": 12,
    "nombre": "Rodrigo Leiva",
    "foto": "/que-se-note/img/ofimundo/RodrigoLeiva.png",
    "empresa": "Ofimundo",
    "area": "Administración y Finanzas",
    "cargo": "Analista de Contabilidad",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      }
    ]
  },
  {
    "id": 13,
    "nombre": "Erika Rojas",
    "foto": "/que-se-note/img/ofimundo/ErikaRojas.png",
    "empresa": "Ofimundo",
    "area": "Administración y Finanzas",
    "cargo": "Encargada Contabilidad",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      }
    ]
  },
  {
    "id": 14,
    "nombre": "Valeria Millán",
    "foto": "/que-se-note/img/ofimundo/ValeriaMillan.png",
    "empresa": "Ofimundo",
    "area": "Administración y Finanzas",
    "cargo": "Analista de Tesorería",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      }
    ]
  },
  {
    "id": 15,
    "nombre": "Satenik Simonyan",
    "foto": "/que-se-note/img/ofimundo/SatenikSimoyan.png",
    "empresa": "Ofimundo",
    "area": "Administración y Finanzas",
    "cargo": "Especialista de Facturación y Cobranza",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      }
    ]
  },
  {
    "id": 16,
    "nombre": "Javiera Alvarez",
    "foto": "/que-se-note/img/ofimundo/JavieraAlvarez.png",
    "empresa": "Ofimundo",
    "area": "Administración y Finanzas",
    "cargo": "Analista de Control de Gestión y Pricing",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      }
    ]
  },
  {
    "id": 17,
    "nombre": "Brian Burgos",
    "foto": "/que-se-note/img/ofimundo/BrianBurgos.png",
    "empresa": "Ofimundo",
    "area": "Tecnología e Innovación",
    "cargo": "Desarrollador",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 33,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 34,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 35,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 36,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Resolución de Problemas Comerciales"
      },
      {
        "id_competencia": 37,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Preocupación por el orden y la claridad"
      }
    ]
  },
  {
    "id": 18,
    "nombre": "Daniel Galvez",
    "foto": "/que-se-note/img/ofimundo/DanielGalvez.png",
    "empresa": "Ofimundo",
    "area": "Tecnología e Innovación",
    "cargo": "Líder Técnico",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 33,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 34,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 35,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 36,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Resolución de Problemas Comerciales"
      },
      {
        "id_competencia": 37,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Preocupación por el orden y la claridad"
      }
    ]
  },
  {
    "id": 19,
    "nombre": "Adán Moris",
    "foto": "/que-se-note/img/ofimundo/AdanMoris.png",
    "empresa": "Ofimundo",
    "area": "Tecnología e Innovación",
    "cargo": "Desarrollador",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 33,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 34,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 35,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 36,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Resolución de Problemas Comerciales"
      },
      {
        "id_competencia": 37,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Preocupación por el orden y la claridad"
      }
    ]
  },
  {
    "id": 20,
    "nombre": "César Caruz",
    "foto": "/que-se-note/img/ofimundo/CesarCaruz.png",
    "empresa": "Ofimundo",
    "area": "Tecnología e Innovación",
    "cargo": "Encargado de Infraestructura y Redes",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 33,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 34,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 35,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 36,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Resolución de Problemas Comerciales"
      },
      {
        "id_competencia": 37,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Preocupación por el orden y la claridad"
      }
    ]
  },
  {
    "id": 21,
    "nombre": "Margarita Arraño",
    "foto": "/que-se-note/img/ofimundo/MargaritaArrano.png",
    "empresa": "Ofimundo",
    "area": "Tecnología e Innovación",
    "cargo": "Desarrolladora",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 33,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 34,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 35,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 36,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Resolución de Problemas Comerciales"
      },
      {
        "id_competencia": 37,
        "tipo": "Específicas",
        "categoria": "Tecnología",
        "competencia": "Preocupación por el orden y la claridad"
      }
    ]
  },
  {
    "id": 22,
    "nombre": "Carolina Espinal",
    "foto": "/que-se-note/img/ofimundo/CarolinaEspinal.png",
    "empresa": "Ofimundo",
    "area": "Experiencia y Marketing",
    "cargo": "Jefa de Marketing y Engagement",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      }
    ]
  },
  {
    "id": 23,
    "nombre": "Karen Curiqueo",
    "foto": "/que-se-note/img/ofimundo/KarenCuriqueo.png",
    "empresa": "Ofimundo",
    "area": "Experiencia y Marketing",
    "cargo": "Especialista Marketing Digital",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      }
    ]
  },
  {
    "id": 24,
    "nombre": "José Ignacio de la Rosa",
    "foto": "/que-se-note/img/ofimundo/JoseIgnaciodelaRosa.png",
    "empresa": "Ofimundo",
    "area": "Experiencia y Marketing",
    "cargo": "Diseñador Gráfico",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      }
    ]
  },
  {
    "id": 25,
    "nombre": "Arelis Hernández",
    "foto": "/que-se-note/img/ofimundo/ArelisHernandez.png",
    "empresa": "Ofimundo",
    "area": "Experiencia Colaboradores",
    "cargo": "Jefe de Experiencia Colaboradores",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 38,
        "tipo": "Específicas",
        "categoria": "Experiencia",
        "competencia": "Desarrollo Estratégico de RRHH"
      },
      {
        "id_competencia": 39,
        "tipo": "Específicas",
        "categoria": "Experiencia",
        "competencia": "Capacidad de Entender a los demás"
      },
      {
        "id_competencia": 40,
        "tipo": "Específicas",
        "categoria": "Experiencia",
        "competencia": "Impacto e Influencia"
      },
      {
        "id_competencia": 20,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de las Personas"
      },
      {
        "id_competencia": 21,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de los equipos"
      },
      {
        "id_competencia": 22,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Empowerment II"
      }
    ]
  },
  {
    "id": 26,
    "nombre": "Elvis Aliaga",
    "foto": "/que-se-note/img/ofimundo/ElvisAliaga.png",
    "empresa": "Ofimundo",
    "area": "Experiencia Colaboradores",
    "cargo": "Especialista en Desarrollo Organizacional",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 38,
        "tipo": "Específicas",
        "categoria": "Experiencia",
        "competencia": "Desarrollo Estratégico de RRHH"
      },
      {
        "id_competencia": 39,
        "tipo": "Específicas",
        "categoria": "Experiencia",
        "competencia": "Capacidad de Entender a los demás"
      },
      {
        "id_competencia": 40,
        "tipo": "Específicas",
        "categoria": "Experiencia",
        "competencia": "Impacto e Influencia"
      },
      {
        "id_competencia": 20,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de las Personas"
      },
      {
        "id_competencia": 21,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de los equipos"
      },
      {
        "id_competencia": 22,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Empowerment II"
      }
    ]
  },
  {
    "id": 27,
    "nombre": "Andy Oyarce",
    "foto": "/que-se-note/img/ofimundo/AndyOyarce.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Jefe de Soporte",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      },
      {
        "id_competencia": 18,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Liderazgo – Coach"
      },
      {
        "id_competencia": 19,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Pensamiento Conceptual"
      },
      {
        "id_competencia": 20,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de las Personas"
      },
      {
        "id_competencia": 21,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de los equipos"
      },
      {
        "id_competencia": 22,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Empowerment II"
      }
    ]
  },
  {
    "id": 28,
    "nombre": "Víctor Astete",
    "foto": "/que-se-note/img/ofimundo/VictorAstete.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Jefe Centro de Distribución",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      },
      {
        "id_competencia": 18,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Liderazgo – Coach"
      },
      {
        "id_competencia": 19,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Pensamiento Conceptual"
      },
      {
        "id_competencia": 20,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de las Personas"
      },
      {
        "id_competencia": 21,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de los equipos"
      },
      {
        "id_competencia": 22,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Empowerment II"
      }
    ]
  },
  {
    "id": 29,
    "nombre": "Jordan Marín",
    "foto": "/que-se-note/img/ofimundo/JordanMarin.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico en Terreno",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 30,
    "nombre": "Jan Morales",
    "foto": "/que-se-note/img/ofimundo/JanMorales.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico en Terreno",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 31,
    "nombre": "Guillermo López",
    "foto": "/que-se-note/img/ofimundo/GuillermoLopez.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico en Terreno",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 32,
    "nombre": "Julio Nahuelcoy",
    "foto": "/que-se-note/img/ofimundo/JulioNahuelcoy.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico en Terreno",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 33,
    "nombre": "Alex Castillo",
    "foto": "/que-se-note/img/ofimundo/AlexCastillo.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico en Terreno",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 34,
    "nombre": "Benjamín Pérez",
    "foto": "/que-se-note/img/ofimundo/BenjaminPerez.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico en Terreno",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 35,
    "nombre": "David Espinoza",
    "foto": "/que-se-note/img/ofimundo/DavidEspinoza.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico Residente",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 36,
    "nombre": "Sergio Urriola",
    "foto": "/que-se-note/img/ofimundo/SergioUrriola.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico Residente",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 37,
    "nombre": "Rodrigo Mancilla",
    "foto": "/que-se-note/img/ofimundo/RodrigoMancilla.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico Residente",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 38,
    "nombre": "Alejandro Toro",
    "foto": "/que-se-note/img/ofimundo/AlejandroToro.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico Residente",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 39,
    "nombre": "Alexis Mardones",
    "foto": "/que-se-note/img/ofimundo/AlexisMardones.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Técnico Residente",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 40,
    "nombre": "Sergio Beltrán",
    "foto": "/que-se-note/img/ofimundo/SergioBeltran.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Asistente de Abastecimiento Técnico",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 41,
    "nombre": "Ricardo Romero",
    "foto": "/que-se-note/img/ofimundo/RicardoRomero.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Customer Care Expert",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 42,
    "nombre": "Lucas Parada",
    "foto": "/que-se-note/img/ofimundo/LucasParada.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Customer Care Expert",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 43,
    "nombre": "Orlando Oyanedel",
    "foto": "/que-se-note/img/ofimundo/OrlandoOyanedel.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Especialista de Monitoreo y Venta Remota",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 44,
    "nombre": "Carlos Zúñiga",
    "foto": "/que-se-note/img/ofimundo/CarlosZuniga.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Ingeniero de Proyectos",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 45,
    "nombre": "Eduardo Olguín",
    "foto": "/que-se-note/img/ofimundo/EduardoOlguin.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Ingeniero de Proyectos",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 46,
    "nombre": "Claudia Núñez",
    "foto": "/que-se-note/img/ofimundo/ClaudiaNunez.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Asistente de Abastecimiento y Control",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 47,
    "nombre": "Pamela Urbina",
    "foto": "/que-se-note/img/ofimundo/PamelaUrbina.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Encargada de Abastecimiento y Control Logístico",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 48,
    "nombre": "Fabián Ojeda",
    "foto": "/que-se-note/img/ofimundo/FabianOjeda.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Asistente de Bodega y Distribución",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 49,
    "nombre": "Cristián Tapia",
    "foto": "/que-se-note/img/ofimundo/CristianTapia.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Asistente de Bodega y Distribución",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 50,
    "nombre": "Benjamín Valdés",
    "foto": "/que-se-note/img/ofimundo/BenjaminValdes.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Asistente de Bodega y Distribución",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 51,
    "nombre": "Boris Chelebifski",
    "foto": "/que-se-note/img/ofimundo/BorisChelebifski.png",
    "empresa": "Ofimundo",
    "area": "Operaciones",
    "cargo": "Ayudante de Bodega y Peoneta",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 52,
    "nombre": "Jorge Vergara",
    "foto": "/que-se-note/img/ofimundo/JorgeVergara.png",
    "empresa": "Ofimundo",
    "area": "Servicios Generales",
    "cargo": "Auxiliar Servicios Generales",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      }
    ]
  },
  {
    "id": 53,
    "nombre": "Silvia Luengo",
    "foto": "/que-se-note/img/ofimundo/SilviaLuengo.png",
    "empresa": "Ofimundo",
    "area": "Servicios Generales",
    "cargo": "Auxiliar Servicios Generales",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      }
    ]
  },
  {
    "id": 54,
    "nombre": "Virginia Astete",
    "foto": "/que-se-note/img/ofimundo/VirginiaAstete.png",
    "empresa": "Ofimundo",
    "area": "Servicios Generales",
    "cargo": "Auxiliar Servicios Generales",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      }
    ]
  },
  {
    "id": 55,
    "nombre": "Cristobal Dueñas",
    "foto": "/que-se-note/img/dreamtec/CristobalDuenas.png",
    "empresa": "Dreamtec",
    "area": "Comercial",
    "cargo": "Category Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 56,
    "nombre": "Ernesto Traub",
    "foto": "/que-se-note/img/dreamtec/ErnestoTraub.png",
    "empresa": "Dreamtec",
    "area": "Comercial",
    "cargo": "Experience Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 57,
    "nombre": "Manuel Ramírez",
    "foto": "/que-se-note/img/dreamtec/ManuelRamirez.png",
    "empresa": "Dreamtec",
    "area": "Comercial",
    "cargo": "Ejecutivo Comercial",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 58,
    "nombre": "Daniel Ortega",
    "foto": "/que-se-note/img/dreamtec/DanielOrtega.png",
    "empresa": "Dreamtec",
    "area": "Operaciones",
    "cargo": "Analista de Ecommerce",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 59,
    "nombre": "Sergio Godoy",
    "foto": "/que-se-note/img/hiway/SergioGodoy.png",
    "empresa": "Hiway",
    "area": "Comercial",
    "cargo": "Ejecutivo Comercial Senior",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 60,
    "nombre": "Cristián Cisternas",
    "foto": "/que-se-note/img/hiway/CristianCisternas.png",
    "empresa": "Hiway",
    "area": "Comercial",
    "cargo": "Ejecutivo Comercial",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 61,
    "nombre": "Rodrigo Espinoza",
    "foto": "/que-se-note/img/hiway/RodrigoEspinoza.png",
    "empresa": "Hiway",
    "area": "Comercial",
    "cargo": "Client Success Manager",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 23,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Dinamismo"
      },
      {
        "id_competencia": 24,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Negociación"
      },
      {
        "id_competencia": 25,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Conciencia Organizacional y Relacionamiento"
      },
      {
        "id_competencia": 26,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Presentación de Soluciones Comerciales"
      },
      {
        "id_competencia": 27,
        "tipo": "Específicas",
        "categoria": "Comercial",
        "competencia": "Resolución de Problemas Comerciales"
      }
    ]
  },
  {
    "id": 62,
    "nombre": "Yazmín Calfuman",
    "foto": "/que-se-note/img/hiway/YazminCalfuman.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Agente de Experiencia",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 63,
    "nombre": "Clemente González",
    "foto": "/que-se-note/img/hiway/ClementeGonzalez.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Agente de Experiencia",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 64,
    "nombre": "Kevin Miranda",
    "foto": "/que-se-note/img/hiway/KevinMiranda.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Agente de Experiencia",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 65,
    "nombre": "Javiera Rodríguez",
    "foto": "/que-se-note/img/hiway/JavieraRodriguez.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Agente de Experiencia",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 66,
    "nombre": "Gustavo Yoalm",
    "foto": "/que-se-note/img/hiway/GustavoYoalm.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Soporte Onsite",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 67,
    "nombre": "Juan Pablo Pino",
    "foto": "/que-se-note/img/hiway/JuanPabloPino.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Soporte Onsite",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 68,
    "nombre": "Cristián Rodríguez",
    "foto": "/que-se-note/img/hiway/CristianRodriguez.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Soporte Onsite",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 69,
    "nombre": "José Riveros",
    "foto": "/que-se-note/img/hiway/JoseRiveros.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Soporte Nivel 2",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 70,
    "nombre": "Eleazar Mattus",
    "foto": "/que-se-note/img/hiway/EleazarMattus.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Soporte Nivel 3",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 71,
    "nombre": "Jonathan Barraes",
    "foto": "/que-se-note/img/hiway/JonathanBarraes.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Soporte Nivel 3",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 72,
    "nombre": "Montserrat Lizama",
    "foto": "/que-se-note/img/hiway/MontserratLizama.png",
    "empresa": "Hiway",
    "area": "Experiencia de Productos y Servicios",
    "cargo": "Analista de TI",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 73,
    "nombre": "Bastián Garrido",
    "foto": "/que-se-note/img/hiway/BastianGarrido.png",
    "empresa": "Hiway",
    "area": "Experiencia de Productos y Servicios",
    "cargo": "Expecialista de Soluciones Senior",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 74,
    "nombre": "Javier Mecklenburg",
    "foto": "/que-se-note/img/hiway/JavierMecklenburg.png",
    "empresa": "Hiway",
    "area": "Experiencia de Productos y Servicios",
    "cargo": "Expecialista de Soluciones Senior",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 75,
    "nombre": "Alexis Pino",
    "foto": "/que-se-note/img/hiway/AlexisPino.png",
    "empresa": "Hiway",
    "area": "Experiencia de Productos y Servicios",
    "cargo": "Especialista de Soluciones Senior",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 76,
    "nombre": "Rafael Gallardo​",
    "foto": "/que-se-note/img/hiway/RafaelGallardo.png",
    "empresa": "Hiway",
    "area": "Operaciones",
    "cargo": "Especialista Técnico de Soluciones​",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 77,
    "nombre": "Pablo Trincado​",
    "foto": "/que-se-note/img/hiway/PabloTrincado.png",
    "empresa": "Hiway",
    "area": "Experiencia de Productos y Servicios",
    "cargo": "Jefe de Experiencia de Servicio​",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      },
      {
        "id_competencia": 18,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Liderazgo – Coach"
      },
      {
        "id_competencia": 19,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Pensamiento Conceptual"
      },
      {
        "id_competencia": 20,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de las Personas"
      },
      {
        "id_competencia": 21,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Desarrollo de los equipos"
      },
      {
        "id_competencia": 22,
        "tipo": "Específicas",
        "categoria": "Líderes",
        "competencia": "Empowerment II"
      }
    ]
  },
  {
    "id": 78,
    "nombre": "Rainier Jaime​",
    "foto": "/que-se-note/img/hiway/RainierJaime.png",
    "empresa": "Hiway",
    "area": "Experiencia de Productos y Servicios",
    "cargo": "Jefe de Proyecto​",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 79,
    "nombre": "Gabriel Galáz",
    "foto": "/que-se-note/img/hiway/GabrielGalaz.png",
    "empresa": "Hiway",
    "area": "Experiencia de Productos y Servicios",
    "cargo": "Jefe de Innovación y Customer Success​​",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 28,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Credibilidad Técnica"
      },
      {
        "id_competencia": 29,
        "tipo": "Específicas",
        "categoria": "Operaciones",
        "competencia": "Levantamiento de Insights"
      }
    ]
  },
  {
    "id": 80,
    "nombre": "Juan Carlos Sepúlveda​",
    "foto": "/que-se-note/img/hiway/JuanCarlosSepulveda.png",
    "empresa": "Hiway",
    "area": "Administración",
    "cargo": "Encargado de Logística​",
    "competencias": [
      {
        "id_competencia": 1,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Orientación a resultados"
      },
      {
        "id_competencia": 2,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Iniciativa"
      },
      {
        "id_competencia": 3,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Perseverancia"
      },
      {
        "id_competencia": 4,
        "tipo": "Transversales",
        "categoria": "Ambición",
        "competencia": "Discriminar"
      },
      {
        "id_competencia": 5,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Temple"
      },
      {
        "id_competencia": 6,
        "tipo": "Transversales",
        "categoria": "Accountability",
        "competencia": "Responsabilidad"
      },
      {
        "id_competencia": 7,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Adaptabilidad al cambio"
      },
      {
        "id_competencia": 8,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Aprendizaje Continuo"
      },
      {
        "id_competencia": 9,
        "tipo": "Transversales",
        "categoria": "Start Up Mindset",
        "competencia": "Innovación"
      },
      {
        "id_competencia": 10,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Trabajo en equipo"
      },
      {
        "id_competencia": 11,
        "tipo": "Transversales",
        "categoria": "Compañerismo",
        "competencia": "Apoyo a compañeros"
      },
      {
        "id_competencia": 12,
        "tipo": "Transversales",
        "categoria": "Customer Centric",
        "competencia": "Orientación a Cliente interno y externo"
      },
      {
        "id_competencia": 13,
        "tipo": "Transversales",
        "categoria": "Respeto",
        "competencia": "Autocontrol"
      },
      {
        "id_competencia": 14,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Integridad"
      },
      {
        "id_competencia": 15,
        "tipo": "Transversales",
        "categoria": "Honestidad",
        "competencia": "Franqueza, Confiabilidad Integridad"
      },
      {
        "id_competencia": 16,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Calidad del Trabajo"
      },
      {
        "id_competencia": 17,
        "tipo": "Específicas",
        "categoria": "Trabajo bien hecho",
        "competencia": "Profundidad en el conocimiento de los productos"
      },
      {
        "id_competencia": 30,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Habilidad Analítica"
      },
      {
        "id_competencia": 31,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Preocupación por el Orden y la Claridad"
      },
      {
        "id_competencia": 32,
        "tipo": "Específicas",
        "categoria": "Administración y Finanzas",
        "competencia": "Búsqueda de información"
      }
    ]
  }
];

export const reconocimientosList: Reconocimiento[] = [];
