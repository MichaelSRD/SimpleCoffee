import Image from "next/image"

interface Product {
  id:number,
  name: string,
  image: string ,
  price: string, 
  rating:number,
  votes:number,
  popular:boolean,
  available:boolean,
}

interface CardProductProps {
  products: Product[];
}

export default function CardProduct( { products  }: CardProductProps  ) {
  return  (
    <>
    { products.map((product)=>(
        <div key={product.id} className="w-[250px]">
        <picture className="w-full h-[160px] relative flex">
          <Image alt="Café" src={product.image} fill className="rounded-xl" />
          { product.popular && (
            <p className="bg-[#F6C768] py-[2px] px-3 text-[#302522] text-[10px] font-bold absolute top-2 left-4 rounded-lg">
              Popular
            </p>
          ) }
        </picture>
        <div className=" space-y-2 ">
          <div className="flex justify-between mt-4 items-center">
            <p className="font-bold">{product.name}</p>
            <p className="bg-[#BEE3CC] p-1 px-2 rounded-md text-[#111315] text-[12px] font-semibold">{product.price}</p>
          </div>
          <div className="flex items-center space-x-2 justify-between text-[14px]">
          <div className="flex items-center space-x-2">
            {!product.rating ? (
              <>
               <Image alt="Star rating" src="/Star.svg" width={20} height={20} />
               <p className=" text-[#4D5562] " >No Ratings</p></>  ):(
                <>
                <Image alt="Star rating" src="/Star_fill.svg" width={20} height={20} />
                <p>{product.rating}</p>
                <p className="text-[#4D5562]">({ product.votes } votes)</p>
                </>
                )  }
             </div>
              {!product.available && (
                 <div>
                   <p className=" text-[#ED735D] font-semibold " >Sold out</p>
                 </div>
              )}
          </div>
        </div>
      </div>
    )) }
   
    </>
  )
}

