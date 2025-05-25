import {FC, useEffect, useState} from 'react';
import {X} from 'lucide-react'
import { Input } from '@/components/ui/input.tsx';
import { Badge } from "@/components/ui/badge"


interface propsI {
    value:string[],
    onChange?:(value:string[]) => void,
}

const Tags: FC<propsI> = ({value=[],onChange}) => {
    const [tags,setTags]= useState<string[]>(value)
    const [input,setInput]= useState<string>('')
    const removeTag=(tag:string)=>{
       const arr:string[]=[]
        tags.forEach(item=>{
            if (item!=tag){
                arr.push(item)
            }
        })
        setTags([...arr])
    }

    // @ts-ignore
    const addTag=(e)=>{
        if (e.key === 'Enter') {
            const arr=[...tags]
            if (!arr.includes(input)){
                arr.push(input.trim())
            }
            setTags([...arr])
            setInput('')
        }
    }

    useEffect(()=>{
        if(onChange){
            onChange(tags)
        }
    },[tags])

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
                    <Input  onKeyDown={addTag} value={input} onChange={e=>setInput(e.target.value)}  />
                <span className="text-xs text-gray-500">Hit Enter to add Tag</span>
            </div>
            <div className="flex w-full flex-wrap">

                {
                    tags.map(tag=><Badge id="tagInput" variant="secondary" className="mr-2 mb-2"  key={tag} color="blue">
                        {tag}
                        <button type="button" onClick={()=>removeTag(tag)} className="text-blue-600"><X className="w-5 h-5"/></button>
                    </Badge>)
                }
            </div>
        </div>
    );
};
export default Tags;