import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService:BoardsService){}

    // @Get('/')
    // getAllBoard():Board[]{
    //     return this.boardsService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto:CreateBoardDto):Promise<Board>{
        return this.boardsService.createBoard(CreateBoardDto)
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    //             ):Board{
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id:number):Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id:string):Board{
    //     return this.boardsService.getBoardById(id)
    // }

    @Delete('/:id')
    deleteBoard(@Param('id',ParseIntPipe) id):Promise<void>{
        return this.boardsService.deleteBoard(id)
    }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id:string):void{
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id:string,
    //     @Body('status') status:BoardStatus
    // ){
    //     return this.boardsService.updateBoardStatus(id,status);
    // }
}
