'use client'
import Image from "next/image";
import CardProduct from "./components/cardProduct";
import { useEffect, useState } from "react";


interface Products {
    id: number,
    name: string,
    image: string ,
    price: string, 
    rating:number,
    votes:number,
    popular:boolean,
    available:boolean,
}

export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Products[]>([]);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'available'>('all');

  useEffect(()=>{
    const fetchProducts = async () =>{
      try {
     
        const res  = await fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data); 
        setDisplayedProducts(data)
    } catch (error) {
      console.log(error);
      
    }
    }
   
    fetchProducts();
   
  },[])
 
  const handleAvailableProduct = () => {
    const availableProducts = products.filter(product => product.available === true);
    setDisplayedProducts(availableProducts);
    setCurrentFilter('available');
  }

  const handleAllProduct = () => {
    setDisplayedProducts(products);
    setCurrentFilter('all');
  }

  return (
   <div className=" flex justify-center  " >
    <picture className=" absolute top-0 left-0 w-full h-[310px] -z-10  ">
      <Image alt="" src={"/bg-cafe-sm.jpg"} fill />
    </picture>
    <div className=" p-7 bg-[#1B1D1F] rounded-lg  my-8 mx-4 md:mt-40  text-center relative z-10 w-[1024px]  " >
       <picture className=" absolute top-0 left-0 w-full h-[200px] -z-10 " >
        <Image alt="" src={"/vector.svg"} fill />
       </picture>
       <h1 className=" text-[2rem] mb-4 text-[#FEF7EE]" >Our Collection</h1>
       <p className=" text-[#6F757C] mb-4 md:mx-56 " >Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.</p>
       <div className=" space-x-4 mt-9 " >
        <button className={`rounded-lg p-2 text-[#FEF7EE] ${ currentFilter === 'all' ? 'bg-[#6F757C]':'hover:bg-[#6F757C]' }  `}  onClick={handleAllProduct} >All Products</button>
        <button className={`rounded-lg p-2 text-[#FEF7EE] ${ currentFilter === 'available' ? 'bg-[#6F757C]':'hover:bg-[#6F757C]' }  `}  onClick={handleAvailableProduct}  >Available Now</button>
       </div>
       <div className=" grid justify-self-center grid-cols-1 mt-3 gap-4 gap-y-12 md:grid-cols-3 md:mt-14 " >
       <CardProduct products={displayedProducts} />
       </div>
    </div>
   </div>
  );
}
