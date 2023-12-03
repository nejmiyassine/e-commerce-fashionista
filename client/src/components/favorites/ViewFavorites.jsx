import { useState } from "react"

const ViewFavorites = ({favorites}) => {
    console.log('favorites' , favorites[4])
    const Gfavorites = favorites[4]
    console.log('f' , Gfavorites)

   const productName = () => { if (Gfavorites) {
        const display = Gfavorites.product
         
         console.log('display' , display)

        // const display  = favorites.map((favorite) =>
        //      favorite.product
        //  );
         //console.log('display' , display)

         const displayProduct = display.product_name
         console.log('d' , displayProduct)
         return displayProduct

         // const displayProduct = display.map((d)=> {
         //     d.product_id
         // })
         // console.log('d' , displayProduct)

        }
    }
        const c = productName()

        const productImage = () => { if (Gfavorites) {
            const display = Gfavorites.product
             console.log('display' , display)
             const displayProduct = display.product_image
             console.log('d' , displayProduct)
             return displayProduct
            }
        }
         const i = productImage()
   return (
    <div>
        dfgdfgsf
    <h1>{c}</h1>
      <img
                    src={` ${i}`}
                    alt={`${i}`}
                />  

    <h1></h1>
    <div>
        <h4></h4>
    </div>
    </div>
)
}

export default ViewFavorites