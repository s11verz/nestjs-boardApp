import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService:BoardsService){}

    @Get()
    getAllBoard(
        @GetUser() user:User
    ):Promise<Board[]>{
        return this.boardsService.getAllBoards(user);
    }
    // @Get('/')
    // getAllBoard():Board[]{
    //     return this.boardsService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto:CreateBoardDto,
    @GetUser() user:User):Promise<Board>{
        return this.boardsService.createBoard(CreateBoardDto,user)
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
    deleteBoard(@Param('id',ParseIntPipe) id,
    @GetUser() user:User
    ):Promise<void>{
        return this.boardsService.deleteBoard(id,user)
    }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id:string):void{
    //     this.boardsService.deleteBoard(id);
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id',ParseIntPipe) id:number,
        @Body('status', BoardStatusValidationPipe) status:BoardStatus
    ){
        return this.boardsService.updateBoardStatus(id,status);
    }
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id:string,
    //     @Body('status') status:BoardStatus
    // ){
    //     return this.boardsService.updateBoardStatus(id,status);
    // }
}
