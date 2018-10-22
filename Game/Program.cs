using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game
{
    class Program
    {
        static void Main(string[] args)
        {

            //Console.SetBufferSize(80, 25);
            //Рамка
            HorizontalLine upline = new HorizontalLine(0,78,0, '+');
            HorizontalLine downline = new HorizontalLine(0,78,24, '+');
            VerticallLine leftline = new VerticallLine(0,24,0, '+');
            VerticallLine rightline = new VerticallLine(0,24,78, '+');

            upline.Draw();
            downline.Draw();
            leftline.Draw();
            rightline.Draw();


            //точки
            Point p1 = new Point(1, 3, '*');
            p1.Draw();

            Point p2 = new Point(4, 5, '#');           
            p2.Draw();


            // Отрисовка точек			
            Point p = new Point(4, 5, '*');
            Snake snake = new Snake(p, 4, Direction.RIGHT);
            snake.Draw();

            while (true)
            {
                if (Console.KeyAvailable)
                {
                    ConsoleKeyInfo key = Console.ReadKey();
                    snake.HandleKey(key.Key);
                }
                Thread.Sleep(100);
                snake.Move();
            }





        }

        
    }
}
