import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// ✅ change to your MongoDB URI
const MONGO_URI = 'mongodb+srv://ranjeetsalal2001:QpVjJB4DpfHAI5iE@cluster0.f9ylbla.mongodb.net/Talk_Flow?retryWrites=true&w=majority';

const DUMMY_PASSWORD = 'talkflow';
const SALT_ROUNDS = 10;

// ✅ raw mongoose schema — no typegoose, no decorator issues
const userSchema = new mongoose.Schema(
  {
    username:  { type: String, required: true, unique: true },
    fullName:  { type: String, required: true },
    email:     { type: String, required: true },
    password:  { type: String, required: true },
    avatarUrl: { type: String, default: null },
    bio:       { type: String, default: null },
    isOnline:  { type: Boolean, default: false },
    lastSeen:  { type: Date, default: null },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('User', userSchema);

const indianNames: string[] = [
  'Rahul Sharma',   'Amit Kumar',     'Rohit Singh',    'Vikas Gupta',    'Ravi Verma',
  'Suresh Yadav',   'Manoj Tiwari',   'Deepak Jain',    'Rajesh Patel',   'Pankaj Mishra',
  'Priya Nair',     'Neha Sharma',    'Pooja Gupta',    'Sneha Patel',    'Ananya Rao',
  'Kavita Joshi',   'Rekha Singh',    'Sunita Mehta',   'Ankita Iyer',    'Divya Kaur',
  'Arjun Mehta',    'Karan Shah',     'Varun Bose',     'Nikhil Reddy',   'Ankit Nair',
  'Mohit Kapoor',   'Gaurav Pandey',  'Tushar Khanna',  'Sumit Bajaj',    'Vivek Ghosh',
  'Ritika Soni',    'Shruti Patil',   'Vandana Desai',  'Bhavna Jha',     'Sonal Dubey',
  'Meera Pillai',   'Nisha Menon',    'Seema Hegde',    'Ritu Kulkarni',  'Geeta Naik',
  'Yash Malhotra',  'Kunal Arora',    'Rohan Bansal',   'Ishaan Sethi',   'Dhruv Saxena',
  'Aditya Thakur',  'Pranav Dixit',   'Harsh Bajpai',   'Aman Chandra',   'Dev Rathore',
];

const bios: string[] = [
  'Love coding and chai ☕',
  'Traveler | Dreamer | Builder 🌍',
  'Just here to chat 😄',
  'Music is my therapy 🎵',
  'Cricket fan 🏏',
  'Photography enthusiast 📷',
  'Fitness freak 💪',
  'Book lover 📚',
  'Making the world better 🌱',
  'Always learning 🚀',
];

// ✅ 50 unique DiceBear avatars — each seed generates a different face
const avatarUrls: string[] = indianNames.map(
  (name) => `https://api.dicebear.com/7.x/thumbs/svg?seed=${name.replace(' ', '')}`
);

async function seed(): Promise<void> {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const hashedPassword = await bcrypt.hash(DUMMY_PASSWORD, SALT_ROUNDS);
  console.log('✅ Password hashed');

  const users = indianNames.map((fullName, i) => ({
    fullName,
    // ✅ random 4-digit number suffix
    username:  fullName.toLowerCase().replace(' ', '_') + '_' + Math.floor(Math.random() * 9000 + 1000),
    email:     fullName.toLowerCase().replace(' ', '') + '@talkflow.dev',
    password:  hashedPassword,
    bio:       bios[i % bios.length],
    // ✅ unique avatar for each user based on their name
    avatarUrl: avatarUrls[i],
  }));

  try {
    const result = await UserModel.insertMany(users, { ordered: false });
    console.log(`✅ Inserted ${result.length} users`);
  } catch (err: any) {
    if (err.insertedDocs) {
      console.log(`✅ Inserted ${err.insertedDocs.length} users (some skipped as duplicates)`);
    } else {
      console.error('❌ Insert error:', err.message);
    }
  }

  await mongoose.disconnect();
  console.log('✅ Done!');
  console.log(`🔑 Password for all users: ${DUMMY_PASSWORD}`);
}

seed();