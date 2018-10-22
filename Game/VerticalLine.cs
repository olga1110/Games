using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game
{
    class VerticallLine: Figure {
        
        public VerticallLine(int yTop, int yBottom, int x, char sym)
        {
            plist = new List<Point>();
            for (int y = yTop; y <= yBottom; y++)
            {
                Point p = new Point(x, y, sym);
                plist.Add(p);

            }

            //Point p1 = new Point(4,4,'*');
            //Point p2 = new Point(5,4,'*');
            //Point p3 = new Point(6,4,'*');
            //plist.Add(p1);
            //plist.Add(p2);
            //plist.Add(p3);
        }

        
    }
}