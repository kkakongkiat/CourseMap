import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ สำคัญมากสำหรับ Railway
  const configuredOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

  app.enableCors({
    origin(origin, callback) {
      if (
        !origin ||
        origin === "http://localhost:3000" ||
        configuredOrigins.includes(origin) ||
        /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`), false);
    },
    credentials: true,
  });

  app.setGlobalPrefix("api");

  // ✅ ต้องใช้ 0.0.0.0 สำหรับ Railway
  const port = process.env.PORT || 3001;
  await app.listen(port, "0.0.0.0");
}
bootstrap();
