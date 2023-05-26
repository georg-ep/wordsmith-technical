import express, { Express, Request, Response, NextFunction } from 'express';

export const app: Express = express();
app.use(express.json());

interface Account {
    id: number;
    name: string;
    address: string; // Basic address field for a street name and number
    phone: string;
    email: string;
}

let accounts: Account[] = [];
let idCounter = 1;

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});

// Validate account details
const validateAccount = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, address } = req.body;

  // Validate all fields required
  if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate phone number format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 phone number format
  if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
  }

  // Validate address format (very basic - just checks for presence of street name and number)
  const addressRegex = /\d+\s+\S+/;
  if (!addressRegex.test(address)) {
      return res.status(400).json({ message: 'Address must include street name and number' });
  }

  next();
}

app.post('/accounts', validateAccount, (req: Request, res: Response) => {
  const account: Account = {
      id: idCounter++,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
  };
  accounts.push(account);
  res.status(201).json(account);
});

app.get('/accounts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const account = accounts.find(account => account.id === id);

  if (!account) {
      res.status(404).json({ message: 'Account not found' });
  } else {
      res.json(account);
  }
});

app.put('/accounts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = accounts.findIndex(account => account.id === id);

  if (index === -1) {
      res.status(404).json({ message: 'Account not found' });
  } else {
      const updatedAccount: Account = {
          ...accounts[index],
          name: req.body.name || accounts[index].name,
          address: req.body.address || accounts[index].address,
          phone: req.body.phone || accounts[index].phone,
          email: req.body.email || accounts[index].email,
      };
      accounts[index] = updatedAccount;
      res.json(updatedAccount);
  }
});

app.delete('/accounts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = accounts.findIndex(account => account.id === id);

  if (index === -1) {
      res.status(404).json({ message: 'Account not found' });
  } else {
      const [deletedAccount] = accounts.splice(index, 1);
      res.json(deletedAccount);
  }
});