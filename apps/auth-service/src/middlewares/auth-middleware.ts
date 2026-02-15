// import { Request,Response,NextFunction } from "express";
// // import verifyToken from "shared-utils";

// export const authenticate=(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const token=req.headers.authorization?.split(" ")[1];
//         if(!token){
//             return res.status(401).json({error:"No token"});
//         }
//         // req.user=verifyToken(token,process.env.JWT_SECRET || "secret");
//         next();
//     }catch{
//         res.status(401).json({error:"Invalid token"});
//     }
// };

// export const authorize=(...roles:String[])=>(req:Request,res:Response,next:NextFunction)=>{
//    if(!roles.includes(req.user?.role)){
//       return res.status(403).json({error:"Forbidden"})
//    }

//    next();
// };
