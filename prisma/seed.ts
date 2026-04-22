import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
// Importamos tu JSON de prueba
import professionalsData from '../konectia-app/src/services/mocks/professionals.json'

const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }
})
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Iniciando la carga de datos a PostgreSQL...')

  for (const pro of professionalsData) {
    // Prisma nos permite crear el Usuario y su Perfil Profesional al mismo tiempo
    const user = await prisma.user.create({
      data: {
        name: pro.name,
        avatarUrl: pro.avatarUrl,
        role: pro.role,
        location: pro.location,
        isVerified: pro.isVerified,
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
            // Insertamos los datos relacionales (que en el schema son modelos independientes)
            badges: {
              create: pro.badges?.map((badge: any) => ({
                type: badge.type,
                label: badge.label,
                sublabel: badge.sublabel,
                status: badge.status,
                icon: badge.icon
              })) || []
            },
            education: {
              create: pro.education?.map((edu: any) => ({
                institution: edu.institution,
                degree: edu.degree,
                year: edu.year
              })) || []
            },
            experience: {
              create: pro.experience?.map((exp: any) => ({
                company: exp.company,
                position: exp.position,
                period: exp.period
              })) || []
            },
            portfolio: {
              create: pro.portfolio?.map((port: any) => ({
                title: port.title,
                imageUrl: port.imageUrl,
                span: port.span
              })) || []
            }
          }
        }
      }
    })
    console.log(`✅ Profesional creado: ${user.name}`)
  }
  
  console.log('¡Todos los datos fueron cargados exitosamente!')
}

main()
  .catch((e) => {
    console.error('Error al cargar los datos:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
