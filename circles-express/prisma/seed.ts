import { PrismaClient } from '@prisma/client';
import { circleSchema } from '@circles/shared';
import { circles } from './seeds/circles';

const prisma = new PrismaClient();

async function main() {
  const promises: Promise<unknown>[] = [];

  circles
    .map((circle) => circleSchema.parse(circle))
    .forEach((circle) => {
      promises.push(
        prisma.circle.upsert({
          where: { id: circle.id },
          create: { ...circle },
          update: {},
        })
      );
    });

  await Promise.all(promises);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
