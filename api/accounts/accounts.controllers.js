// let accounts = require('../../accounts');

// exports.accountCreate = (req, res) => {
//   const id = accounts[accounts.length - 1].id + 1;
//   const newAccount = { ...req.body, funds: 0, id };
//   accounts.push(newAccount);
//   res.status(201).json(newAccount);
// };

// exports.accountDelete = (req, res) => {
//   const { accountId } = req.params;
//   const foundAccount = accounts.find((account) => account.id === +accountId);
//   if (foundAccount) {
//     accounts = accounts.filter((account) => account.id !== +accountId);
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: 'Account not found' });
//   }
// };

// exports.accountUpdate = (req, res) => {
//   const { accountId } = req.params;
//   const foundAccount = accounts.find((account) => account.id === +accountId);
//   if (foundAccount) {
//     foundAccount.funds = req.body.funds;
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: 'Account not found' });
//   }
// };

// exports.accountsGet = (req, res) => {
//   res.json(accounts);
// };

// exports.getAccountByUsername = (req, res) => {
//   const { username } = req.params;
//   const foundAccount = accounts.find(
//     (account) => account.username === username
//   );
//   if (req.query.currency === 'usd') {
//     const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
//     res.status(201).json(accountInUsd);
//   }
//   res.status(201).json(foundAccount);
// };
const Account = require("../../models/Account");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating account", error: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await Account.deleteOne({ _id: accountId });
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      foundAccount.funds = req.body.funds;
      await foundAccount.save();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find({}, { createdAt: 0, updatedAt: 0 });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAccountByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const foundAccount = await Account.findOne({ username });
    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (req.query.currency === "usd") {
      const accountInUsd = {
        ...foundAccount.toObject(),
        funds: foundAccount.funds * 3.31,
      };
      return res.status(200).json(accountInUsd);
    }
    res.status(200).json(foundAccount);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
