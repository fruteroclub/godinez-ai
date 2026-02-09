# Godínez.AI — Master Document

**Versión:** 1.0
**Fecha:** 2026-02-09
**Autor:** Kukulcán (K7), CPO
**Aprobado por:** Mel (CEO)

---

## Tabla de Contenidos

1. [Visión y Misión](#1-visión-y-misión)
2. [Descripción del Producto](#2-descripción-del-producto)
3. [Mercado Objetivo](#3-mercado-objetivo)
4. [Modelo de Negocio](#4-modelo-de-negocio)
5. [Componentes del Proyecto](#5-componentes-del-proyecto)
6. [Referencia Técnica de Producto](#6-referencia-técnica-de-producto)
7. [Roadmap](#7-roadmap)
8. [Métricas de Éxito](#8-métricas-de-éxito)
9. [Equipo y Responsabilidades](#9-equipo-y-responsabilidades)
10. [Anexos](#10-anexos)

---

## 1. Visión y Misión

### Visión

**Ser el puente que conecta a los profesionales de LATAM con el poder de la inteligencia artificial, permitiéndoles recuperar su tiempo y maximizar su impacto.**

### Misión

**Democratizar el acceso a agentes de IA autónomos para PyMEs, freelancers y founders que necesitan automatización pero no tienen equipos técnicos.**

### North Star (Q1 2026)

> **Poner los Godínez (Agentes IA) en las manos de los usuarios para recibir feedback, aplicar aprendizajes, iterar.**

### El Loop de Crecimiento

```
Marketing → Usuarios → Tech → Producto → Inversión
    ↑                                        ↓
    ←←←←←←←← feedback + aprendizajes ←←←←←←←
```

---

## 2. Descripción del Producto

### ¿Qué es Godínez.AI?

Godínez.AI es un servicio de hosting de agentes de IA enfocado en LATAM. Proporcionamos asistentes virtuales autónomos que se integran con las herramientas que ya usan nuestros clientes (WhatsApp, Telegram, email) para automatizar tareas repetitivas.

### Origen del Nombre

"Godínez" es el término mexicano para el oficinista dedicado que hace la chamba día tras día — la metáfora perfecta para un agente de IA que trabaja incansablemente por ti.

### Tagline

> **"El asistente al que le delegas todo"**

### Propuesta de Valor

| Para el Usuario | Beneficio |
|-----------------|-----------|
| **Recuperar tiempo** | Delega tareas repetitivas al agente |
| **Salir temprano** | El agente trabaja 24/7, tú no |
| **Aumentar ingresos** | Más tiempo para trabajo de alto valor |
| **Sin setup técnico** | Nosotros manejamos la infraestructura |

### Diferenciadores Competitivos

1. **Spanish-native** — Agentes nativos en español, no traducidos
2. **WhatsApp-first** — Integración nativa con la herramienta de comunicación de LATAM
3. **LATAM-specific skills** — SAT, CURP, servicios locales
4. **Managed service** — El cliente solo chatea, nosotros manejamos todo lo técnico

---

## 3. Mercado Objetivo

### Segmento Primario: Godínez-Fresa

**Definición:** Oficinista de clase media-alta que estudió una carrera exitosamente, trabaja en corporativo o empresa establecida, y busca optimizar su tiempo sin perder su estilo de vida.

**Características:**
- Edad: 25-45 años
- Educación: Universitaria completa
- Ingreso: $30,000-$100,000 MXN/mes
- Ubicación: Ciudades principales de México (CDMX, GDL, MTY)
- Tech-savvy pero no técnico
- Usa WhatsApp para todo

### Industrias Objetivo

| Industria | Casos de Uso |
|-----------|--------------|
| 💰 Finanzas | Reportes, seguimiento de gastos, recordatorios |
| 🏥 Salud | Citas, seguimiento pacientes, documentación |
| 📈 Ventas | Follow-ups, CRM updates, prospección |
| 🚀 Founders | Todo lo operativo que distrae del producto |
| 🎓 Estudiantes | Organización, investigación, recordatorios |
| 🏠 Trabajo Remoto | Productividad, scheduling, comunicación |
| 🎯 Freelancers | Facturación, clientes, administración |
| 🎬 Creativos | Scheduling, gestión de proyectos, admin |
| 💻 Desarrolladores | DevOps, monitoreo, automatización |
| 📊 Administración | Documentos, reportes, coordinación |

---

## 4. Modelo de Negocio

### Tiers de Pricing

| Tier | Nombre | Precio (MXN/mes) | Margen Target | Descripción |
|------|--------|------------------|---------------|-------------|
| 🌱 | **Becario** | $1,999 | 90% | Tareas básicas, uso limitado |
| ⚡ | **Asistente** | $3,499 | 87% | Asistente completo, soporte prioritario |
| 🚀 | **Agente** | $9,999 | 77% | Agente custom, integraciones, dedicado |

### Estructura de Costos (Por Agente)

| Componente | Becario | Asistente | Agente |
|------------|---------|-----------|--------|
| Infraestructura | ~$19 USD | ~$30 USD | ~$30 USD |
| LLM APIs | ~$40 USD | ~$150 USD | ~$500 USD |
| **Total** | ~$59 USD | ~$180 USD | ~$530 USD |

### Revenue Streams

1. **Suscripciones mensuales** — Ingreso recurrente principal
2. **Onboarding fee** — Setup inicial para agentes custom (Tier Agente)
3. **Skills marketplace** — Futuro: venta de skills pre-construidos

### Unit Economics Target

- **LTV:CAC ratio:** > 3:1
- **Churn mensual:** < 5%
- **Gross margin:** > 75%

---

## 5. Componentes del Proyecto

### 5.1 Capa de Producto: Godínez.AI

**URL:** https://godinez.ai
**Repo:** github.com/fruteroclub/godinez-ai

| Componente | Tecnología | Estado |
|------------|------------|--------|
| Landing Page | Next.js 16 + Tailwind | ✅ Live |
| Waitlist | Convex (serverless DB) | ✅ Live |
| Admin Dashboard | Next.js + Convex | ✅ Live |
| Customer Portal | Next.js | ⏳ Pendiente |
| Billing | Stripe / Conekta | ⏳ Pendiente |

### 5.2 Capa de Infraestructura: Burrito.gg

**Descripción:** Control plane para provisionar y gestionar agentes autónomos.

| Término | Significado |
|---------|-------------|
| **Burrito** | Una instancia VPS corriendo un agente OpenClaw |
| **Filling** | Configuración del agente: SOUL.md, MEMORY.md, API keys |
| **Tortilla** | Runtime de OpenClaw: Node.js, systemd, gateway |
| **Order** | Request de deployment |
| **Wrap** | Proceso de provisioning |

**Stack:**
```
Godinez.AI (producto)
    │
    ▼
Burrito.gg (control plane)
    │
    ▼
AWS EC2 (compute)
    │
    ▼
OpenClaw (agent runtime)
```

### 5.3 Runtime: OpenClaw

**Descripción:** El motor que ejecuta los agentes de IA.

**Capacidades:**
- Multi-modelo (Opus, Sonnet, Haiku)
- Multi-canal (Telegram, Discord, WhatsApp)
- Sistema de skills extensible
- Memoria persistente
- Ejecución de código y herramientas

---

## 6. Referencia Técnica de Producto

### 6.1 Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────┐
│                      USUARIOS                            │
│   (WhatsApp, Telegram, Discord, Web)                    │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   GODINEZ.AI                            │
│   Landing Page │ Customer Portal │ Admin Dashboard      │
│   (Next.js + Convex + Vercel)                          │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   BURRITO.GG API                        │
│   Provisioning │ Health Checks │ Billing Integration    │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      AWS                                │
│   EC2 (Burritos) │ Secrets Manager │ CloudWatch        │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    OPENCLAW                             │
│   LLM Orchestration │ Channels │ Skills │ Memory       │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Modelo de Aislamiento

**Un agente = Una instancia EC2**

- Sin estado compartido entre agentes
- Cada agente tiene sus propias credenciales
- Aislamiento completo de red y datos
- Cumple con requerimientos de privacidad

### 6.3 Prioridades de Arquitectura

| Prioridad | Descripción | Impacto |
|-----------|-------------|---------|
| 1. **Costos** | Mantener márgenes 75%+ | Decisiones de instancia, modelo routing |
| 2. **Seguridad** | Proteger API keys y datos | Secrets Manager, IAM, hardening |
| 3. **Privacidad** | Aislamiento de datos por usuario | One-instance-per-agent |
| 4. **Disponibilidad** | Uptime de agentes | Monitoring, auto-recovery |
| 5. **Confiabilidad** | Comportamiento consistente | Health checks, alerting |
| 6. **Desempeño** | Velocidad de respuesta | Secundario a costos |

### 6.4 Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 16, React, Tailwind CSS |
| Backend | Convex (serverless), Node.js |
| Hosting Web | Vercel |
| Compute Agentes | AWS EC2 (us-east-1) |
| Base de Datos | Convex (waitlist), Per-agent local storage |
| Secrets | AWS Secrets Manager |
| Monitoring | AWS CloudWatch |
| CI/CD | GitHub Actions |
| LLM | Anthropic Claude (Opus, Sonnet, Haiku) |

### 6.5 Integraciones Planeadas

| Canal | Prioridad | Estado |
|-------|-----------|--------|
| Telegram | Alta | ✅ Soportado en OpenClaw |
| WhatsApp Business | Alta | ⏳ En desarrollo |
| Discord | Media | ✅ Soportado en OpenClaw |
| Web Chat | Media | ⏳ Pendiente |
| Email | Baja | ⏳ Pendiente |

---

## 7. Roadmap

### Fase 1: Foundation (Completada)
- [x] Landing page
- [x] Waitlist con Convex
- [x] Admin dashboard
- [x] Documentación de arquitectura

### Fase 2: Infrastructure (En Progreso)
- [ ] Burrito.gg API v1
- [ ] Provisioning automatizado
- [ ] Health monitoring
- [ ] First 5 beta agents

### Fase 3: Product (Q1 2026)
- [ ] Customer portal
- [ ] Self-serve onboarding
- [ ] Billing integration
- [ ] WhatsApp integration

### Fase 4: Scale (Q2 2026)
- [ ] Skills marketplace
- [ ] Usage-based pricing option
- [ ] Multi-region support
- [ ] Enterprise tier

---

## 8. Métricas de Éxito

### North Star Metric
**Agentes activos con > 10 interacciones/día**

### Métricas por Departamento

| Departamento | Métrica | Target Q1 2026 |
|--------------|---------|----------------|
| **Marketing** | Waitlist signups | 500 |
| **Marketing** | Conversion waitlist → trial | 10% |
| **Producto** | Agentes activos | 25 |
| **Producto** | NPS | > 40 |
| **Tech** | Uptime | 99.5% |
| **Tech** | Costo por agente | < $200 USD |
| **Finanzas** | MRR | $10K USD |
| **Finanzas** | Gross margin | > 75% |

### Métricas del Alfa Test

- Patrones de uso por industria
- Distribución de tiers
- Cuellos de botella técnicos
- Feature requests más comunes
- Razones de churn

---

## 9. Equipo y Responsabilidades

| Persona | Rol | Responsabilidad Godínez.AI |
|---------|-----|---------------------------|
| **Mel** | CEO | Estrategia, partnerships, fundraising |
| **K7 (Kukulcán)** | CPO | Producto, arquitectura, roadmap |
| **Scarf** | Technical Lead | Implementación, infrastructure |
| **Ian** | BD Lead | Revenue, primeros clientes |
| **Ema** | Marketing Lead | Campaña "Se buscan Godínez" |
| **Jazz** | Community Lead | Onboarding, soporte early users |
| **Brian** | DevRel | Documentación, developer experience |
| **Valentín** | COO | Operaciones, métricas |

---

## 10. Anexos

### A. Documentación Técnica Detallada

Ubicación: `godinez-ai/docs/architecture-initial-research/`

| Documento | Contenido |
|-----------|-----------|
| 01-strategy-and-requirements.md | North star, pricing, prioridades |
| 02-platform-concepts.md | Terminología Burrito/Filling/Tortilla |
| 03-tortilla-ami-spec.md | Especificaciones de AMI |
| 04-provisioning-pipeline.md | Pipeline de deployment |
| 05-api-surface.md | Endpoints de Burrito.gg API |
| 06-monitoring-and-observability.md | CloudWatch, alerting |
| 07-security-model.md | IAM, secrets, hardening |
| 08-cost-model.md | Costos por agente, márgenes |
| 09-aws-services-inventory.md | Servicios AWS utilizados |
| 10-implementation-phases.md | Fases de implementación |

### B. Assets Digitales

| Asset | URL |
|-------|-----|
| Landing Page | https://godinez.ai |
| Repositorio | github.com/fruteroclub/godinez-ai |
| Convex Dashboard | dashboard.convex.dev/d/rare-peacock-547 |
| Vercel Project | vercel.com/fruteroclub/godinez-ai |

### C. Contacto

- **Producto:** k7@frutero.club
- **Negocio:** mel@frutero.club
- **Soporte:** hola@godinez.ai

---

*Documento mantenido por el equipo de Producto. Última actualización: 2026-02-09*

*"the serpent builds while the fruit ripens"* 🐍
