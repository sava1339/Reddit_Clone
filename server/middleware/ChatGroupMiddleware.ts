module.exports = (req:any,res:any,next:any)=>{
    req.method === "OPTIONS" && next();
    try {
        const {userId} = req.body;
        if(!userId){
            return res.status(401).json({message: 'Не подтверженн создатель чата!'});
        }
        const creators  = userId.split(' ');
        creators.map((el:string)=> req.user.id === +el ? next() : null);
        return res.status(401).json({message: 'Не подтверженн создатель чата!'});
    } catch (e) {
        return res.status(401).json({message: 'Не подтверженн создатель чата!'});
    }
}