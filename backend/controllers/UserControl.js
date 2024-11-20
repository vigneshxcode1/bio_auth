import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usermodel from '../Model/UserModels.js';



export const register = async (req, res) => {
    const { name, phone, fingerprint } = req.body;

    try {
        // const hashedFingerprint = await bcryptjs.hash(fingerprint.attestationObject, 10);
        // console.log(hashedFingerprint);

        const newUser = new usermodel({
            name,
            phone,
            fingerprint
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Registration completed"
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};

export const login = async(req,res)=>
{
const {phone,fingerPrint}=req.body;
const user =await usermodel.findOne({phone});

if (!user) return res.status(404).send('User not found');

const ismath = await bcryptjs.compare(fingerPrint,user.hashpassword);
if (!ismath) return res.status(400).send('Invalid fingerprint');

try {
    const token = jwt.sign({id:user._id},process.env.SECRETE_KEY,{expiresIn:'1h'});

res.status(200).json({
    success:true,
    message:"login success",
    token
})

} catch (error) {
    res.status(500).json({
        success:false,
        message:"login failed",
    })
}

}

