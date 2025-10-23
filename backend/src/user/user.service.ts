import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { eq, InferModel, or } from 'drizzle-orm';
import { ConflictException } from '@nestjs/common';
import { usersTable } from './schema/schema';

type User = InferModel<typeof usersTable>;

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<{ users: typeof usersTable }>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

    console.log('User created with ID:', newUser.id);

    return newUser;
  }

  async findById(id: number): Promise<User> {
    const [verify] = await this.database
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!verify) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return verify;
  }

  async findByEmail({
    email,
  }: {
    email: CreateUserDto['email'];
  }): Promise<User> {
    const [user] = await this.database
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      throw new NotFoundException('Email não cadastrado no sistema.');
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.database.query.users.findMany();

    console.log(users);

    return users;
  }
}
