import { Controller, Get, Post, Put, Patch, Delete, Param, Query, Body, UsePipes, ValidationPipe,ParseIntPipe } from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { DeliverymanDTO } from './deliveryman.dto';

@Controller('deliveryman')
export class DeliverymanController {

 constructor(private readonly service: DeliverymanService) {}

   @Get('listall')
   getAll():object{
    return this.service.getAll();
   }
   
   @Get('getbyid/:id')
   getById(@Param('id',ParseIntPipe)id:number):object {
       return this.service.getById(id);
   }
    
    @Get('getbyidandname')
    getByIdAndName(
        @Query('id',ParseIntPipe) id: number,
        @Query('name') name: string
    ): object {
        return this.service.getByIdAndName(id, name);
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    create(@Body() info: DeliverymanDTO): object { 
        return this.service.create(info);
    }

    @Put('update/:id')
    update(
        @Param('id',ParseIntPipe) id: number,
        @Body() info: DeliverymanDTO
    ): object {
        return this.service.update(id, info);
    }

    @Patch('updatestatus/:id')
    updateStatus(
        @Param('id',ParseIntPipe) id: number,
        @Body('status') status: string
    ): object {
        return this.service.updateStatus(id, status);
    }

    @Delete('delete/:id')
    remove(@Param('id',ParseIntPipe) id: number): object {
        return this.service.remove(id);
    }

    @Get('search')
    search(@Query('area') area: string): object {
        return this.service.search(area);
    }

    

    
}
