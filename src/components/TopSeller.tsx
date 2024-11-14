import React, { useEffect, useState } from 'react'

interface Author {
   name:string
   isfollowing:boolean
   image:string
}

const TopSeller = () => {

    const [authors,setAuthors]=useState<Author[]>([]);

    useEffect(()=>{
        const fetchData=async ()=>{
            try {
                const response=await fetch('https://randomuser.me/api/?results=5');
                const data=await response.json();

                const authorsData:Author[]=data.results.map((user:any)=>({
                    name: `${user.name.first} ${user.name.last}`,
                    isfollowing:false,
                    image:user.picture.medium,
                }))
                setAuthors(authorsData)
            } catch (error) {
                console.log(`Error fetching authors:${error}`)
            }

        }
        fetchData();
    },[])

    const handleFollowClick=(index:number)=>{
             setAuthors(prevAuthor=> prevAuthor.map((author,i)=>i === index ? {...author,isfollowing:!author.isfollowing}:author))
    }



    
  return (
    <div className='bg-white p-5 mx-5 mt-[5rem] border w-[22rem] rounded'>
        <h2 className='text-xl font-bold mb-5'>Top Seller</h2>
        <ul>
            {authors.map((author,index)=>(
                <li key={index} className='flex items-center justify-between mb-4'>
                    <section className="flex justify-center items-center">
                        <img src={author.image} alt={author.name} className='w-[25%] h-[25%] justify-center rounded-full' />
                        <span className="ml-4">
                            {author.name}
                        </span>
                    </section>
                    <button onClick={()=>handleFollowClick(index)} className={`py-1 px-3 rounded ${author.isfollowing ? 'bg-red-500 text-white':'bg-black text-white'}`}>{author.isfollowing?"Unfollow":"Follow"}</button>
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export default TopSeller

