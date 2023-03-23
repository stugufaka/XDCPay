pragma solidity ^0.8.0;

contract XLending {
    
    struct Lender {
        address lenderAddress;
        uint256 balance;
        uint256 interestRate;
        uint256 score;
    }
    
    struct Borrower {
        address borrowerAddress;
        uint256 loanAmount;
        uint256 interestRate;
        bool approved;
        bool paid;
        uint256 deadline;
        uint256 score;
    }
    
    struct Loan {
        address borrowerAddress;
        uint256 loanAmount;
        uint256 interestRate;
        bool approved;
        bool paid;
        uint256 deadline;
        uint256 score;
    }
    
    struct PendingLoan {
        address borrowerAddress;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 deliveryTime;
        uint256 score;
    }
    
    mapping(address => Lender) public lenders;
    mapping(address => mapping(uint256 => Loan)) public loans;
    mapping(address => mapping(uint256 => PendingLoan)) public pendingLoans;
    mapping(address => uint256[]) public borrowerLoanIds;
    mapping(address => address[]) public lenderPendingLoans;
    mapping(address => mapping(uint256 => Borrower)) public borrowers;

    Lender[] public lenderList;
    Borrower[] public borrowerList;
    uint256 public nextLoanId;
    uint256 public nextPendingLoanId;
    
   function becomeALender(uint256 _interestRate) public {
        require(lenders[msg.sender].lenderAddress == address(0), "Already a lender");
        lenders[msg.sender] = Lender({
            lenderAddress: msg.sender,
            balance: (msg.sender).balance,
            interestRate: _interestRate,
            score: 0
        });
        lenderList.push(lenders[msg.sender]);
    }
    

    function becomeABorrower() public {
        Borrower memory newBorrower = Borrower({
            borrowerAddress: msg.sender,
            loanAmount: 0,
            interestRate: 0,
            approved: false,
            paid: false,
            deadline: 0,
            score: 0
        });
        borrowers[msg.sender][nextLoanId] = newBorrower;
        borrowerList.push(newBorrower);
    }

    function addInterestRate(uint256 _interestRate) public {
        require(lenders[msg.sender].lenderAddress != address(0), "Only lenders can add interest rate");
        lenders[msg.sender].interestRate = _interestRate;
    }
    
    function requestLoan(address _lenderAddress, uint256 _loanAmount, uint256 _interestRate, uint256 _deadline) public {
        // require(borrowers[msg.sender][nextLoanId].borrowerAddress == address(0), "Only borrowers can request loan");
        nextLoanId++;
        borrowers[msg.sender][nextLoanId] = Borrower({
            borrowerAddress: msg.sender,
            loanAmount: _loanAmount,
            interestRate: _interestRate,
            approved: false,
            paid: false,
            deadline: block.timestamp + _deadline,
            score: 0
         });

        loans[msg.sender][nextLoanId] = Loan({
            borrowerAddress: msg.sender,
            loanAmount: _loanAmount,
            interestRate: _interestRate,
            approved: false,
            paid: false,
            deadline: block.timestamp + _deadline,
            score: 0
        });
        borrowerLoanIds[msg.sender].push(nextLoanId);
        pendingLoans[_lenderAddress][nextPendingLoanId] = PendingLoan({
            borrowerAddress: msg.sender,
            loanAmount: _loanAmount,
            interestRate: _interestRate,
                    deliveryTime: block.timestamp + _deadline,
        score: 0
         });
        lenderPendingLoans[_lenderAddress].push(msg.sender);
        nextPendingLoanId++;
    }


    function borrowerPendingLoans() public view returns (PendingLoan[] memory) {
        // require(borrowers[msg.sender][nextLoanId].borrowerAddress != address(0), "Only borrowers can get pending loans");
        uint256[] memory pendingLoanIds = new uint256[](borrowerLoanIds[msg.sender].length);
        uint256 index = 0;
        for (uint256 i = 0; i < borrowerLoanIds[msg.sender].length; i++) {
            uint256 loanId = borrowerLoanIds[msg.sender][i];
            Borrower storage borrower = borrowers[msg.sender][loanId];
            if (!borrower.approved) {
                pendingLoanIds[index] = loanId;
                index++;
            }
        }
        PendingLoan[] memory result = new PendingLoan[](index);
        for (uint256 i = 0; i < index; i++) {
            uint256 loanId = pendingLoanIds[i];
            PendingLoan storage pendingLoan = pendingLoans[msg.sender][loanId];
            Borrower storage borrower = borrowers[msg.sender][loanId];
            result[i] = PendingLoan({
                borrowerAddress: borrower.borrowerAddress,
                loanAmount: borrower.loanAmount,
                interestRate: borrower.interestRate,
                deliveryTime: pendingLoan.deliveryTime,
                score: pendingLoan.score
            });
        }
        return result;
    }

    function getAllLoansGivenOut(address _lenderAddress) public view returns (Loan[] memory) {
        // require(lenders[_lenderAddress].lenderAddress != address(0), "Invalid lender address");
        uint256[] memory loanIds = borrowerLoanIds[_lenderAddress];
        Loan[] memory result = new Loan[](loanIds.length);
        for (uint256 i = 0; i < loanIds.length; i++) {
            uint256 loanId = loanIds[i];
            Loan storage loan = loans[_lenderAddress][loanId];
            if (loan.approved && !loan.paid) {
                result[i] = loan;
            }
        }
        return result;
    }


    function getAllApprovedLoans(address _borrowerAddress) public view returns (Loan[] memory) {
        uint256[] memory borrowerLoanIdsArray = borrowerLoanIds[_borrowerAddress];
        uint256 numApprovedLoans = 0;
        for (uint256 i = 0; i < borrowerLoanIdsArray.length; i++) {
            uint256 loanId = borrowerLoanIdsArray[i];
            if (loans[_borrowerAddress][loanId].approved) {
                numApprovedLoans++;
            }
        }
        Loan[] memory result = new Loan[](numApprovedLoans);
        uint256 index = 0;
        for (uint256 i = 0; i < borrowerLoanIdsArray.length; i++) {
            uint256 loanId = borrowerLoanIdsArray[i];
            Loan storage loan = loans[_borrowerAddress][loanId];
            if (loan.approved) {
                result[index] = loan;
                index++;
            }
        }
        return result;
    }


    function getPendingLoans() public view returns (PendingLoan[] memory) {
        // require(lenders[msg.sender].lenderAddress != address(0), "Only lenders can get pending loans");
        address[] memory pendingBorrowers = lenderPendingLoans[msg.sender];
        PendingLoan[] memory result = new PendingLoan[](pendingBorrowers.length);
        for (uint256 i = 0; i < pendingBorrowers.length; i++) {
            address borrower = pendingBorrowers[i];
            uint256 loanId = borrowerLoanIds[borrower][borrowerLoanIds[borrower].length - 1];
            Borrower storage borrowerStruct = borrowers[borrower][loanId];
            PendingLoan storage pendingLoanStruct = pendingLoans[msg.sender][i];
            result[i] = PendingLoan({
                borrowerAddress: borrower,
                loanAmount: borrowerStruct.loanAmount,
                interestRate: borrowerStruct.interestRate,
                deliveryTime: pendingLoanStruct.deliveryTime,
                score: pendingLoanStruct.score
            });
        }
        return result;
    }

//could be used as all loan given out and waiting for payment
    function getAllUnpaidLoans() public view returns (uint256[] memory) {
        // require(borrowers[msg.sender][nextLoanId].borrowerAddress != address(0), "Only borrowers can get unpaid loans");
        uint256[] memory unpaidLoanIds = new uint256[](borrowerLoanIds[msg.sender].length);
        uint256 index = 0;
        for (uint256 i = 0; i < borrowerLoanIds[msg.sender].length; i++) {
            uint256 loanId = borrowerLoanIds[msg.sender][i];
            Borrower storage borrower = borrowers[msg.sender][loanId];
            if (borrower.approved && !borrower.paid && block.timestamp < borrower.deadline) {
                unpaidLoanIds[index] = loanId;
                index++;
            }
        }
        uint256[] memory result = new uint256[](index);
        for (uint256 i = 0; i < index; i++) {
            result[i] = unpaidLoanIds[i];
        }
        return result;
    }

    function getAllLenders() public view returns (Lender[] memory) {
        return lenderList;
    }

  
    function getAllBorrowers() public view returns (Borrower[] memory) {
        return borrowerList;
    } 



    function getLoanBalance(address _borrowerAddress, uint256 _loanId) public view returns (uint256) {
        require(borrowers[_borrowerAddress][_loanId].borrowerAddress != address(0), "Loan does not exist");
        uint256 interest = borrowers[_borrowerAddress][_loanId].loanAmount * borrowers[_borrowerAddress][_loanId].interestRate / 100;
        uint256 totalAmount = borrowers[_borrowerAddress][_loanId].loanAmount + interest;
        return totalAmount;
    }

    function checkLoanStatus(address _borrowerAddress, uint256 _loanId) public view returns (bool) {
        return borrowers[_borrowerAddress][_loanId].approved;
    }


function approveLoan(address _borrowerAddress, uint256 _loanId) public payable {
    require(lenders[msg.sender].lenderAddress != address(0), "Only lenders can approve loan");
    Borrower storage borrower = borrowers[_borrowerAddress][_loanId];
    require(borrower.borrowerAddress != address(0), "Borrower does not exist");
    require(!borrower.approved, "Loan already approved");
    uint256 interest = borrower.loanAmount * lenders[msg.sender].interestRate / 100;
    uint256 totalAmount = borrower.loanAmount + interest;
    require(lenders[msg.sender].balance >= totalAmount, "Insufficient balance");
    lenders[msg.sender].balance -= totalAmount;
    borrower.approved = true;
    borrower.deadline = block.timestamp + 30 days;
    payable(_borrowerAddress).transfer(totalAmount);
    
    bool borrowerExists = false;
    for (uint256 i = 0; i < borrowerList.length; i++) {
        if (borrowerList[i].borrowerAddress == borrower.borrowerAddress) {
            borrowerExists = true;
            break;
        }
    }
    if (!borrowerExists) {
        borrowerList.push(borrower);
    }
    
    bool lenderExists = false;
    for (uint256 i = 0; i < lenderList.length; i++) {
        if (lenderList[i].lenderAddress == msg.sender) {
            lenderExists = true;
            break;
        }
    }
    if (!lenderExists) {
        Lender memory newLender = Lender({
            lenderAddress: msg.sender,
            balance: 0,
            interestRate: 0,
            score: 0
        });
        lenderList.push(newLender);
    }
}



    function markAsPaid(address _borrowerAddress, uint256 _loanId) public {
        require(borrowers[_borrowerAddress][_loanId].borrowerAddress == msg.sender, "Only borrower can mark loan as paid");
        require(borrowers[_borrowerAddress][_loanId].approved, "Loan not approved");
        require(!borrowers[_borrowerAddress][_loanId].paid, "Loan already paid");
        require(block.timestamp < borrowers[_borrowerAddress][_loanId].deadline, "Loan has already expired");
        Borrower storage borrower = borrowers[_borrowerAddress][_loanId];
        borrower.paid = true;
        updateBorrowerScore(_borrowerAddress);
    }

    function repay(uint256 _loanId) public payable {
        require(borrowers[msg.sender][_loanId].borrowerAddress != address(0), "Only borrowers can repay");
        require(borrowers[msg.sender][_loanId].approved, "Loan not approved");
        require(!borrowers[msg.sender][_loanId].paid, "Loan already paid");
        require(block.timestamp < borrowers[msg.sender][_loanId].deadline, "Loan has already expired");
        uint256 amount = msg.value;
        uint256 interest = borrowers[msg.sender][_loanId].loanAmount * borrowers[msg.sender][_loanId].interestRate / 100;
        uint256 totalAmount = borrowers[msg.sender][_loanId].loanAmount + interest;
        require(amount >= totalAmount, "Insufficient amount to repay loan");
        uint256 excess = amount - totalAmount;
        if (excess > 0) {
            payable(msg.sender).transfer(excess);
        }
        lenders[msg.sender].balance += borrowers[msg.sender][_loanId].loanAmount;
        borrowers[msg.sender][_loanId].paid = true;
        updateBorrowerScore(msg.sender);
        payable(lenders[msg.sender].lenderAddress).transfer(borrowers[msg.sender][_loanId].loanAmount);
    }

    function isLender(address _address) public view returns (bool) {
        return lenders[_address].lenderAddress != address(0);
    }

    function isBorrower(address _address) public view returns (bool) {
        return borrowers[_address][nextLoanId].borrowerAddress != address(0);
    }

    function isLoanPaid(uint256 _loanId) public view returns (bool) {
        require(borrowers[msg.sender][_loanId].borrowerAddress != address(0), "Only borrowers can check loan status");
        return borrowers[msg.sender][_loanId].paid;
    }

    function updateBorrowerScore(address _borrowerAddress) private {
        uint256 score = 0;
        uint256 numPaidLoans = 0;
        uint256 numUnpaidLoans = 0;
        for (uint256 i = 0; i < borrowerLoanIds[_borrowerAddress].length; i++) {
            uint256 loanId = borrowerLoanIds[_borrowerAddress][i];
            if (borrowers[_borrowerAddress][loanId].paid) {
            numPaidLoans++;
            score++;
            } else if (block.timestamp > borrowers[_borrowerAddress][loanId].deadline) {
            numUnpaidLoans++;
            }
        }
        if (numPaidLoans > 0 && numUnpaidLoans == 0) {
            score += numPaidLoans;
        }
        if (score > 10) {
            score = 10;
        }
        borrowers[_borrowerAddress][0].score = score;
    }

}