import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ สำคัญมากสำหรับ Railway
  app.enableCors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL || "", // ใส่ Vercel URL ตอน deploy
    ],
    credentials: true,
  });

  app.setGlobalPrefix("api");

  // ✅ ต้องใช้ 0.0.0.0 สำหรับ Railway
  const port = process.env.PORT || 3001;
  await app.listen(port, "0.0.0.0");
}
bootstrap();