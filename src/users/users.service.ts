import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
    {
        "id":1,
        "name":"Maaz",
        "email":"maaz@gmail.com",
        "role":"INTERN"
    },
    {
        "id":2,
        "name":"Usaid",
        "email":"usaid@gmail.com",
        "role":"ENGINEER"
    },
    {
        "id":3,
        "name":"Ahmed",
        "email":"ahmed@gmail.com",
        "role":"ADMIN"
    }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        if(role){
            const RolesArray =  this.users.filter(user => user.role === role)
            if (!RolesArray.length) throw new NotFoundException('User not found')
            return RolesArray
        }   
        return this.users
    }

    findOne(id:number){
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found.')
        return user
    }

    create(createUserDto: CreateUserDto){
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id : usersByHighestId[0].id+1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id : number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if (user.id === id){
                return {...user , ...updateUserDto }
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id : number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
