import jwt from 'jsonwebtoken'

const token = jwt.sign({_id: 'io1io234j'}, 'process.env.JWT_SECRET', {expiresIn: '10s'})

console.log(token);

