import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { eq, or } from 'drizzle-orm';
import { ConflictException } from '@nestjs/common';
import { usersTable } from './schema/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<{ users: typeof usersTable }>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.database
      .select()
      .from(usersTable)
      .where(
        or(
          eq(usersTable.email, createUserDto.email),
          eq(usersTable.tax_id, createUserDto.taxId),
        ),
      );

    if (existingUser.length > 0) {
      throw new ConflictException(
        'Um usuario com estas credenciais já existe.',
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const [newUser] = await this.database
      .insert(usersTable)
      .values({
        first_name: createUserDto.firstName,
        last_name: createUserDto.lastName,
        email: createUserDto.email,
        password: hashedPassword,
        cellphone: createUserDto.cellphone,
        tax_id: createUserDto.taxId,
      })
      .returning();

    return newUser;
  }

  async findById(id: number) {
    const [verify] = await this.database
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!verify) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return verify;
  }

  async findByEmail({ email }: { email: CreateUserDto['email'] }) {
    const [user] = await this.database
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      throw new NotFoundException('Email não cadastrado no sistema.');
    }

    return user;
  }

  async findAll() {
    const users = await this.database.query.users.findMany();

    console.log(users);

    return users;
  }
}
