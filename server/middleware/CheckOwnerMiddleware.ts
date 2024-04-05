module.exports = (req:any,res:any,next:any)=>{
    req.method === "OPTIONS" && next();
    try {
        const {userId} = req.body;
        if(!userId){
            return res.status(401).json({message: 'Не подтверженн создатель сообщества!'});
        }
        if(userId != req.user.id){
            return res.status(401).json({message: 'Не подтверженн создатель сообщества!'});
        }
        next();
    } catch (e) {
        return res.status(401).json({message: 'Не подтверженн создатель сообщества!'});
    }
}