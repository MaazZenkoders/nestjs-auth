import { Body, Controller, Delete, Get, Param, Patch, Post, Query , ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Role } from 'src/decorators/roles.decorators';

@Role('admin')
@UseGuards(AuthenticationGuard , AuthorizationGuard)
@Controller('users')
export class UsersController {

    constructor(private readonly usersService : UsersService){}

    @Get() 
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post()  
    create(@Body(ValidationPipe) createUserDto:CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Patch(':id') 
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto:UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') 
    delete(@Param('id',ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}
