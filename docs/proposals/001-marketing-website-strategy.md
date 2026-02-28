# Propuesta 001: Estrategia de Marketing Web — Godínez.AI

**Fecha:** 2026-02-17  
**Autora:** Aibus Dumbleclaw 🧙‍♀️  
**Para:** Mel (CEO), Ema (Marketing), K7 (CPO)  
**Estado:** Borrador — pendiente revisión  

---

## 1. Situación Actual

### Lo que tenemos
- **Landing page** en godinez.ai con: hero, problema, qué es, pricing, capacidades, waitlist
- **Waitlist** con +200 signups (según copy actual)
- **11 agentes activos** operando en producción (dato interno — no se muestra en el sitio)
- **Stack validado**: OpenClaw + AWS + Convex — arquitectura probada con agentes reales
- **Equipo de 8 personas** operando el servicio

### El problema
El sitio actual es una landing page estática con waitlist. Comunica *qué es* pero no muestra *que ya funciona*. Un visitante no tiene forma de saber que Godínez.AI ya tiene 11 agentes en producción sirviendo clientes reales. Eso es tracción invisible — el peor tipo.

### Insight emocional
> El dueño de PyME en LATAM no confía en promesas tecnológicas. Ha pagado por herramientas que no usó, suscripciones que olvidó cancelar, y "soluciones" que requirieron otro empleado para operar. **No quiere innovación — quiere evidencia de que funciona.**

---

## 2. Propuesta Estratégica

### Single-Minded Proposition (SMP)
> **"Godínez.AI ya trabaja. Literalmente."**

La ventaja competitiva más fuerte que tiene Godínez.AI no es la tecnología — es que **ya tiene 11 agentes en producción haciendo trabajo real**. Eso es lo que ningún competidor en LATAM puede decir hoy.

### Objetivos

| OKR | Métrica | Target Q1 2026 |
|-----|---------|----------------|
| Aumentar conversión waitlist | Conversion rate | 10% → 15% |
| Generar urgencia | Waitlist signups/semana | 2x actual |
| Establecer credibilidad | Bounce rate landing | -20% |
| Habilitar ventas directas | Leads calificados/mes | 10 nuevos |

---

## 3. Nuevas Páginas Propuestas

### 3.1 `/agentes` — "Conoce a los Godínez"

**Propósito:** Mostrar que los agentes son reales, tienen personalidad, y ya están trabajando.

**Contenido:**
- Grid de 11 cartas de agente, cada una con:
  - Nombre y avatar
  - Industria / especialización
  - Tiempo activo ("trabajando desde hace X días")
  - Stat en vivo: "X mensajes procesados hoy" (o dato agregado)
  - Un quote del agente (generado, breve, con personalidad)
- **Counter prominente:** "11 Godínez trabajando ahora mismo"
- CTA: "¿Quieres el tuyo?"

**Por qué funciona:**  
Transforma "tenemos agentes" (abstracto) en "estos agentes existen y trabajan" (concreto). La gente confía en lo que puede ver.

**Dato técnico:** Los stats pueden ser estáticos/semanales al inicio. No necesitan ser real-time para generar el efecto.

---

### 3.2 `/casos` — Casos de Uso Reales

**Propósito:** Mostrar escenarios concretos donde un Godínez resuelve problemas del día a día.

**Contenido:**
- 4-6 casos de uso narrados como mini-historias:
  - **El consultorio dental** que dejaba de perder citas con recordatorios automáticos
  - **La founder que** delegó follow-ups de ventas y recuperó 10hrs/semana
  - **La agencia de marketing** que automatizó reportes mensuales a clientes
  - **El despacho contable** en temporada de declaraciones
- Cada caso incluye: problema → solución → resultado
- Screenshot o mockup de una conversación real (anonimizada)

**Por qué funciona:**  
El target (Godínez-Fresa) necesita verse reflejado. "Alguien como yo ya lo usa" es más poderoso que cualquier feature list.

**Nota:** Pueden ser semi-ficcionalizados basados en los 11 agentes reales. No necesitan ser testimonios literales.

---

### 3.3 `/como-funciona` — El Proceso en 3 Pasos

**Propósito:** Reducir la fricción del "¿y esto cómo funciona?" que frena la conversión.

**Contenido:**
1. **Nos cuentas** — ¿Qué tareas te drenan? (formulario expandido o call de 15 min)
2. **Configuramos tu Godínez** — En 48h tienes tu agente listo, conectado a tus canales
3. **Tu Godínez trabaja** — Lo supervisas desde WhatsApp/Telegram, como si fuera un empleado más

**Elementos visuales:**
- Timeline animado (3 pasos)
- "Tiempo promedio de setup: 48 horas"
- FAQ colapsable debajo

**Por qué funciona:**  
El managed service ES el diferenciador. El cliente no instala nada, no configura nada. Eso hay que hacerlo explícito.

---

### 3.4 `/blog` o `/recursos` — Content Marketing Hub

**Propósito:** SEO + autoridad + nurturing de leads.

**Contenido inicial (4 posts):**
1. "¿Qué es un agente de IA y por qué tu negocio necesita uno en 2026?"
2. "Godínez vs ChatGPT: por qué un chatbot no es un empleado"
3. "5 tareas que le puedes delegar a un agente de IA hoy"
4. "Cuánto cuesta un asistente virtual en México — humano vs IA"

**Por qué funciona:**  
Captura tráfico orgánico de PyMEs buscando soluciones. Posiciona a Godínez.AI como autoridad en el espacio agentes-para-LATAM.

---

## 4. Modificaciones a Páginas Existentes

### 4.1 Hero — Agregar Social Proof

**Actual:**
> "Tu empleado AI que nunca falta al trabajo"

**Propuesto — agregar debajo del subtitle:**
> 🟢 **11 agentes activos** trabajando para negocios en México ahora mismo

Un número concreto genera más confianza que cualquier promesa. Bonus: actualizarlo conforme crezca.

### 4.2 Waitlist — Generar Urgencia (FOMO)

**Actual:**
> "Únete a +200 negocios que ya reservaron su Godínez"

**Propuesto:**
> "Solo estamos aceptando **25 negocios** en la siguiente ronda. Quedan **X lugares**."

**Mecánica:**  
- Batch releases: abrir cupo limitado cada 2-4 semanas
- Counter de lugares restantes (puede ser manual al inicio)
- Email a waitlist cuando se abre nueva ronda → urgencia real

**Por qué funciona:**  
Scarcity + exclusividad. No es artificial — el onboarding manual realmente limita la capacidad. Comunicarlo es honesto y genera acción.

### 4.3 Pricing — Agregar Comparativa

Debajo de los 3 tiers, agregar una tabla comparativa:

| | Contratar empleado | Freelancer | Godínez.AI |
|---|---|---|---|
| Costo mensual | $15,000-25,000 | $8,000-15,000 | Desde $1,999 |
| Disponibilidad | 8hrs/día | Variable | Hasta 24/7 |
| Vacaciones | 12 días/año | Impredecible | Nunca |
| Capacitación | 2-4 semanas | N/A | 48 horas |
| Escalar | Contratar otro | Buscar otro | Un click |

### 4.4 Navbar — Actualizar Links

**Actual:** Qué es | Planes | Capacidades | Lista de Espera

**Propuesto:** Qué es | Agentes | Cómo Funciona | Planes | Lista de Espera

---

## 5. Estrategia de FOMO / Tracción

### 5.1 El Counter Viviente

En el header o hero, un banner persistente:

> 🟢 **11 Godínez activos** | **+200 en lista de espera** | **Próxima ronda: 15 de marzo**

Actualizar semanalmente. Cada número que sube refuerza la tracción.

### 5.2 "Recién contratado"

Pop-up sutil (estilo Fomo/Proof) que aparece cada 30-60 segundos:

> "🎉 Un negocio en Guadalajara acaba de activar su Godínez — hace 2 días"

Puede ser datos reales (anonimizados) o basado en los últimos signups de waitlist.

### 5.3 Newsletter desde Waitlist

Los +200 en waitlist son leads tibios que se enfrían cada día sin contacto.

**Propuesta:** Email quincenal con:
- Update de agentes activos ("ahora somos 11... pronto 15")
- Un caso de uso o tip
- Fecha de próxima ronda de onboarding
- "Responde este email si quieres ser de los primeros"

---

## 6. Copy: Voz y Tono

### Principios de voz Godínez.AI
1. **Directo** — Sin corporate speak. "Hace la chamba" > "Optimiza tus workflows"
2. **Con humor** — El nombre ya es un chiste. Aprovecharlo, no ignorarlo
3. **Confiable** — Datos > promesas. Números > adjetivos
4. **Mexicano** — Spanglish natural, no forzado. "Setup" sí, "leverage" no

### Frases a evitar
- "Revolucionamos..." / "Disruptivo..." / "De última generación..."
- "Inteligencia artificial de vanguardia..."
- Cualquier cosa que suene a pitch de Silicon Valley traducido

### Frases a adoptar
- "Hace la chamba mientras tú descansas"
- "Tu Godínez ya está trabajando"
- "Más barato que un intern. Más confiable que un freelancer."
- "No necesitas entender IA. Solo necesitas saber qué delegar."

---

## 7. Priorización

### Fase 1 — Impacto inmediato (1-2 semanas)
1. ✏️ Agregar social proof al hero ("11 agentes activos")
2. ✏️ Actualizar copy de waitlist (batch + scarcity)
3. ✏️ Agregar tabla comparativa en pricing
4. 📧 Primer email a waitlist existente

### Fase 2 — Nuevas páginas (2-4 semanas)
5. 🆕 `/como-funciona` — más rápida de construir
6. 🆕 `/agentes` — requiere definir qué datos mostrar de cada agente
7. 🔄 Actualizar navbar

### Fase 3 — Content + Nurturing (ongoing)
8. 🆕 `/casos` — requiere narrativas bien escritas
9. 🆕 `/blog` — primer post + setup
10. 📧 Newsletter quincenal automatizada

---

## 8. Métricas de Éxito

| Métrica | Baseline | Target post-implementación |
|---------|----------|---------------------------|
| Bounce rate | Actual | -20% |
| Tiempo en sitio | Actual | +40% |
| Waitlist conversion | Actual | +50% relativo |
| Email open rate (newsletter) | N/A | >30% |
| Leads calificados/mes | N/A | 10+ |

---

## 9. Notas Técnicas

- Todas las páginas nuevas se implementan en el mismo stack (Next.js 16 + Tailwind)
- Content en `content.ts` para mantener i18n-ready
- Stats de agentes pueden ser estáticos con actualización manual semanal
- Newsletter: evaluar Resend, Loops, o Convex + email simple
- Branch de desarrollo: `aibus-dev` desde `dev`

---

*"No le digas al cliente que eres bueno. Muéstrale que ya estás trabajando."* 🧙‍♀️
