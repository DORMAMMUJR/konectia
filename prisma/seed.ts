import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { hash } from 'bcryptjs'

const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🚀 Iniciando la carga de datos a PostgreSQL (INTECNIA)...\n')

  // --- 1. Create Categories ---
  console.log('📂 Creando categorías...')
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Plomería', description: 'Instalaciones y reparaciones hidráulicas', icon: 'plumbing', expertCount: 42 } }),
    prisma.category.create({ data: { name: 'Electricidad', description: 'Instalaciones y mantenimiento eléctrico', icon: 'electrical_services', expertCount: 38 } }),
    prisma.category.create({ data: { name: 'Carpintería', description: 'Muebles a medida y reparaciones', icon: 'carpenter', expertCount: 25 } }),
    prisma.category.create({ data: { name: 'Pintura', description: 'Pintura residencial e industrial', icon: 'format_paint', expertCount: 31 } }),
    prisma.category.create({ data: { name: 'Limpieza', description: 'Limpieza profesional de espacios', icon: 'cleaning_services', expertCount: 55 } }),
    prisma.category.create({ data: { name: 'Cerrajería', description: 'Apertura y cambio de cerraduras', icon: 'lock', expertCount: 18 } }),
  ])
  console.log(`   ✅ ${categories.length} categorías creadas`)

  // --- 2. Create Users (Clients) ---
  console.log('\n👤 Creando usuarios cliente...')
  const clientPassword = await hash('Cliente123', 12)
  
  const client1 = await prisma.user.create({
    data: {
      email: 'carlos@intecnia.mx',
      passwordHash: clientPassword,
      name: 'Carlos Ramírez',
      avatarUrl: '/images/featured-provider.png',
      role: 'client',
      location: 'Ciudad de México',
      isVerified: true,
      verificationLevel: 'standard',
    }
  })
  const client2 = await prisma.user.create({
    data: {
      email: 'ana@intecnia.mx',
      passwordHash: clientPassword,
      name: 'Ana López',
      avatarUrl: '/images/featured-provider.png',
      role: 'client',
      location: 'Zapopan, JAL',
      isVerified: true,
      verificationLevel: 'standard',
    }
  })
  console.log(`   ✅ Clientes creados: ${client1.name}, ${client2.name}`)

  // --- 3. Create Professional Users ---
  console.log('\n🔧 Creando profesionales...')
  const proPassword = await hash('Profesional123', 12)

  const professionalsData = [
    {
      email: 'roberto@intecnia.mx',
      name: 'Roberto Méndez',
      location: 'Zapopan, JAL',
      verificationLevel: 'premium',
      title: 'Maestro Plomero',
      specialty: 'Sistemas Hidroneumáticos',
      rating: 4.9,
      reviewCount: 142,
      yearsExperience: 8,
      completedJobs: 142,
      recurringClients: 38,
      responseTime: '< 2 horas',
      hourlyRate: 650,
      badges: [
        { type: 'biometric', label: 'Identidad Biométrica', sublabel: 'Verificada', status: 'verified', icon: 'fingerprint' },
        { type: 'conocer', label: 'CONOCER', sublabel: 'Certificado', status: 'verified', icon: 'card_membership' },
        { type: 'sat', label: 'Cumplimiento SAT', sublabel: 'Profesional Verificado', status: 'verified', icon: 'account_balance' },
      ],
      education: [{ institution: 'IPN', degree: 'Técnico en Instalaciones Hidráulicas', year: '2014' }],
      experience: [
        { company: 'Contratista Independiente', position: 'Maestro Plomero Senior', period: '2016 - Presente' },
        { company: 'Grupo Hídrico MX', position: 'Técnico Especialista', period: '2012 - 2016' },
      ],
      portfolio: [
        { title: 'Instalación Industrial', imageUrl: '/images/hero-bg.png', span: 'large' },
        { title: 'Hogar Inteligente', imageUrl: '/images/client-workflow.png', span: 'normal' },
        { title: 'Mantenimiento Comercial', imageUrl: '/images/pro-dashboard.png', span: 'normal' },
        { title: 'Red Solar', imageUrl: '/images/hero-bg.png', span: 'wide' },
      ],
    },
    {
      email: 'ricardo@intecnia.mx',
      name: 'Ing. Ricardo Mendoza',
      location: 'Ciudad de México, MX',
      verificationLevel: 'premium',
      title: 'Ingeniero Electricista Certificado',
      specialty: 'Instalaciones Industriales',
      rating: 4.9,
      reviewCount: 124,
      yearsExperience: 12,
      completedJobs: 342,
      recurringClients: 42,
      responseTime: '< 2 horas',
      hourlyRate: 850,
      badges: [
        { type: 'biometric', label: 'Identidad Biométrica', sublabel: 'Verificada', status: 'verified', icon: 'fingerprint' },
        { type: 'conocer', label: 'CONOCER', sublabel: 'Certificado', status: 'verified', icon: 'card_membership' },
        { type: 'sat', label: 'Cumplimiento SAT', sublabel: 'Profesional Verificado', status: 'verified', icon: 'account_balance' },
      ],
      education: [
        { institution: 'UNAM', degree: 'Licenciatura en Ingeniería Eléctrica', year: '2006 - 2011' },
        { institution: 'ITESM', degree: 'Especialidad en Sistemas Industriales', year: '2013' },
      ],
      experience: [
        { company: 'Contratista Independiente', position: 'Consultor Técnico Líder', period: '2018 - Presente' },
        { company: 'Siemens México', position: 'Ingeniero de Campo Senior', period: '2012 - 2018' },
      ],
      portfolio: [
        { title: 'Configuración de Red Eléctrica Industrial', imageUrl: '/images/pro-dashboard.png', span: 'large' },
        { title: 'Hogar Inteligente', imageUrl: '/images/client-workflow.png', span: 'normal' },
        { title: 'Paneles Solares Comerciales', imageUrl: '/images/hero-bg.png', span: 'wide' },
      ],
    },
    {
      email: 'lucia@intecnia.mx',
      name: 'Lucía Gutiérrez',
      location: 'Zapopan, JAL',
      verificationLevel: 'standard',
      title: 'Instalaciones Sanitarias',
      specialty: 'Remodelaciones de Baños y Cocinas',
      rating: 4.7,
      reviewCount: 89,
      yearsExperience: 5,
      completedJobs: 89,
      recurringClients: 28,
      responseTime: '< 4 horas',
      hourlyRate: 500,
      badges: [
        { type: 'biometric', label: 'Identidad Biométrica', sublabel: 'Verificada', status: 'verified', icon: 'fingerprint' },
        { type: 'sat', label: 'Cumplimiento SAT', sublabel: 'Profesional Verificado', status: 'verified', icon: 'account_balance' },
      ],
      education: [{ institution: 'CONALEP', degree: 'Técnico en Instalaciones Sanitarias', year: '2017' }],
      experience: [{ company: 'Independiente', position: 'Especialista en Remodelaciones', period: '2019 - Presente' }],
      portfolio: [
        { title: 'Remodelación de Baño Premium', imageUrl: '/images/client-workflow.png', span: 'large' },
        { title: 'Cocina Integral', imageUrl: '/images/pro-dashboard.png', span: 'normal' },
      ],
    },
    {
      email: 'jorge@intecnia.mx',
      name: 'Jorge Hernández',
      location: 'Zapopan, JAL',
      verificationLevel: 'premium',
      title: 'Plomería Industrial',
      specialty: 'Calderas y Sistemas de Presión',
      rating: 5.0,
      reviewCount: 210,
      yearsExperience: 15,
      completedJobs: 210,
      recurringClients: 55,
      responseTime: '< 1 hora',
      hourlyRate: 900,
      badges: [
        { type: 'biometric', label: 'Identidad Biométrica', sublabel: 'Verificada', status: 'verified', icon: 'fingerprint' },
        { type: 'conocer', label: 'CONOCER', sublabel: 'Certificado', status: 'verified', icon: 'card_membership' },
        { type: 'sat', label: 'Cumplimiento SAT', sublabel: 'Profesional Verificado', status: 'verified', icon: 'account_balance' },
      ],
      education: [{ institution: 'ITESM', degree: 'Ingeniería Mecánica', year: '2005 - 2010' }],
      experience: [
        { company: 'Contratista Independiente', position: 'Consultor Industrial Senior', period: '2015 - Presente' },
        { company: 'PEMEX Subcontratista', position: 'Ingeniero de Planta', period: '2010 - 2015' },
      ],
      portfolio: [
        { title: 'Sistema Industrial Completo', imageUrl: '/images/hero-bg.png', span: 'large' },
        { title: 'Calderas Comerciales', imageUrl: '/images/pro-dashboard.png', span: 'normal' },
        { title: 'Presión Constante Residencial', imageUrl: '/images/client-workflow.png', span: 'normal' },
      ],
    },
  ]

  const proUsers: any[] = []
  for (const pro of professionalsData) {
    const user = await prisma.user.create({
      data: {
        email: pro.email,
        passwordHash: proPassword,
        name: pro.name,
        avatarUrl: '/images/featured-provider.png',
        role: 'professional',
        location: pro.location,
        isVerified: true,
        verificationLevel: pro.verificationLevel,
        professional: {
          create: {
            title: pro.title,
            specialty: pro.specialty,
            rating: pro.rating,
            reviewCount: pro.reviewCount,
            yearsExperience: pro.yearsExperience,
            completedJobs: pro.completedJobs,
            recurringClients: pro.recurringClients,
            responseTime: pro.responseTime,
            hourlyRate: pro.hourlyRate,
            badges: { create: pro.badges },
            education: { create: pro.education },
            experience: { create: pro.experience },
            portfolio: { create: pro.portfolio },
          }
        }
      },
      include: { professional: true }
    })
    proUsers.push(user)
    console.log(`   ✅ Profesional creado: ${user.name}`)
  }

  // --- 4. Create Service Requests ---
  console.log('\n📋 Creando solicitudes de servicio...')
  const plomeria = categories[0]
  const electricidad = categories[1]
  const limpieza = categories[4]

  await prisma.serviceRequest.createMany({
    data: [
      {
        clientId: client1.id,
        title: 'Fuga urgente en cocina',
        description: 'Tengo una fuga debajo del fregadero que necesita reparación urgente. El agua está dañando el piso de madera.',
        budgetMin: 800, budgetMax: 1500, budgetUnit: 'fixed', urgency: 'urgent',
        categoryId: plomeria.id, categoryIcon: 'plumbing', location: 'Polanco, CDMX',
      },
      {
        clientId: client2.id,
        title: 'Instalación de luminarias LED en oficina',
        description: 'Necesito reemplazar toda la iluminación fluorescente de mi oficina por luminarias LED empotradas. Son aproximadamente 20 luminarias.',
        budgetMin: 3000, budgetMax: 6000, budgetUnit: 'fixed', urgency: 'new',
        categoryId: electricidad.id, categoryIcon: 'electrical_services', location: 'Zapopan, JAL',
      },
      {
        clientId: client1.id,
        title: 'Limpieza profunda post-obra',
        description: 'Acabo de terminar una remodelación en mi departamento y necesito una limpieza profunda de 120m².',
        budgetMin: 2000, budgetMax: 3500, budgetUnit: 'fixed', urgency: 'standard',
        categoryId: limpieza.id, categoryIcon: 'cleaning_services', location: 'Roma Norte, CDMX',
      },
    ],
  })
  console.log('   ✅ 3 solicitudes creadas')

  // --- 5. Create Projects ---
  console.log('\n🏗️  Creando proyectos...')
  const project1 = await prisma.project.create({
    data: {
      title: 'Reparación Hidráulica Cocina',
      clientId: client1.id,
      professionalId: proUsers[0].id,
      progress: 65,
      status: 'active',
      imageUrl: '/images/hero-bg.png',
    }
  })
  const project2 = await prisma.project.create({
    data: {
      title: 'Instalación Red Eléctrica Oficina',
      clientId: client2.id,
      professionalId: proUsers[1].id,
      progress: 30,
      status: 'active',
      imageUrl: '/images/pro-dashboard.png',
    }
  })
  console.log('   ✅ 2 proyectos creados')

  // --- 6. Create Payments ---
  console.log('\n💰 Creando pagos...')
  await prisma.payment.createMany({
    data: [
      { projectId: project1.id, description: 'Anticipo - Reparación Hidráulica', amount: 1650, status: 'received', transactionId: 'TXN-001-ESC' },
      { projectId: project1.id, description: 'Materiales - Válvulas Importadas', amount: 450, status: 'pending', transactionId: 'TXN-002-ESC' },
      { projectId: project2.id, description: 'Anticipo - Instalación Eléctrica', amount: 3000, status: 'received', transactionId: 'TXN-003-ESC' },
    ],
  })
  console.log('   ✅ 3 pagos creados')

  // --- 7. Create Conversations ---
  console.log('\n💬 Creando conversaciones...')
  const conv1 = await prisma.conversation.create({
    data: {
      participantA: client1.id,
      participantB: proUsers[0].id,
      messages: {
        create: [
          { senderId: proUsers[0].id, content: 'Hola, he revisado los detalles de la fuga en su cocina. Basado en las fotos, he preparado una cotización formal.', type: 'text' },
          { senderId: client1.id, content: 'Perfecto, me parece justo el precio. ¿Podrías comenzar mañana a las 9:00 AM?', type: 'text' },
        ],
      },
    },
  })
  await prisma.conversation.create({
    data: {
      participantA: client2.id,
      participantB: proUsers[1].id,
      messages: {
        create: [
          { senderId: proUsers[1].id, content: 'Buenos días, revisé las especificaciones de su oficina. Le comparto mi propuesta técnica.', type: 'text' },
        ],
      },
    },
  })
  console.log('   ✅ 2 conversaciones creadas')

  // --- 8. Create Reviews ---
  console.log('\n⭐ Creando reseñas...')
  await prisma.review.createMany({
    data: [
      { professionalId: proUsers[0].professional!.id, authorId: client1.id, rating: 5, text: 'Excelente trabajo. Llegó puntual, explicó todo el proceso y dejó el área limpia. Altamente recomendado.', projectType: 'Reparación Hidráulica' },
      { professionalId: proUsers[0].professional!.id, authorId: client2.id, rating: 5, text: 'Muy profesional y conocedor. Resolvió una fuga compleja que otros plomeros no pudieron diagnosticar.', projectType: 'Diagnóstico Industrial' },
      { professionalId: proUsers[1].professional!.id, authorId: client1.id, rating: 5, text: 'Trabajo impecable en la instalación eléctrica de mi oficina. Todo quedó perfecto y a código.', projectType: 'Instalación Eléctrica' },
    ],
  })
  console.log('   ✅ 3 reseñas creadas')

  console.log('\n🎉 ¡Base de datos INTECNIA poblada exitosamente!')
  console.log('\n📧 Credenciales de prueba:')
  console.log('   Cliente:      carlos@intecnia.mx / Cliente123')
  console.log('   Profesional:  roberto@intecnia.mx / Profesional123')
}

main()
  .catch((e) => {
    console.error('❌ Error al cargar los datos:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
