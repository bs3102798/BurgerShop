import { Category } from "@/app/models/Category"
//@/app/models/User

export async function POST(req){
    const {name} = await req.json()
   const categoryDoc =  await Category.create({name});
   return Response.json(categoryDoc);

}

export async function GET(req) {
    return Response.json(
        await Category.find()

    )
}