import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobEntity } from './jobs/entities/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: process.env.PS_HOST,
      port: parseInt(process.env.PS_PORT) || 5432,
      username: process.env.PS_USERNAME,
      password: process.env.PS_PWD,
      database: process.env.PS_NAME,
      entities: [JobEntity],
      synchronize: true,
      logging: true,
    }),
  }),
  CacheModule.registerAsync({
    isGlobal: true,
    useFactory: async () => ({
      store: await redisStore({
        socket: {
          host: process.env.REDIS_HOST,  
            port: parseInt(process.env.REDIS_PORT) || 6379, 
        }
      }),
    }),
  }),
  JobsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
