module.exports = rules

function rules(prev, next){
 
var count=0;
var charicter=0;

  for(i=0;i<prev.shape[0]-1;i++)
  {
    for(j=0;j<prev.shape[1]-1;j++)
      {
       charicter = prev.get(i,j);
       if(charicter > 9 && charicter < 20 )   // the charicter is a simple live cell (20 can be towls)
        {

          for(ci=-1;ci<=1;ci++)
          {
           for(cj=-1;cj<=1;cj++)
           {
             if(cj === 0 && ci === 0)
               continue
             else if(i+ci < 0 || j+cj < 0 )
               continue
             else
             {
              count = prev.get(i+ci , j + cj);
              if(count < 20)
                prev.set(i+ci , j+cj , count+1 );
             }
            }
           }
          }
         }
     }                                     /// all cels who are betwin 10 and 20 are simple live cels and add to theys nabors count
  for(i=0;i<prev.shape[0]-1;i++)
  {
      for(j=0;j<prev.shape[1]-1;j++)
      {
        count = prev.get(i,j);
         if(count === 3 || count === 12 || count === 13)
           next.set(i,j,10);
         else if(count === -3 || count === -12 || count === -13)
           next.set(i,j,-10);
         else if(count < 20 && count > -20)
           next.set(i,j,0);
      }
  }                                     /////// all cels cheak the ruls and get an apsulut charicter value (0,10,20,30 atc) 
}


