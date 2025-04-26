const db = require('../db/connection');

exports.home = (req, res) => {
    res.render('home', { title: 'Strona główna' });
};

exports.list = async (req, res) => {
    try {
        const [tenders] = await db.query(
            'SELECT * FROM tenders WHERE NOW() < deadline'
        );
        res.render('tenders', { tenders });
    } catch (err) {
        res.status(500).send('Błąd serwera');
    }
};

exports.showAddForm = (req, res) => {
    res.render('addTender');
};

exports.addTender = async (req, res) => {
    const { title, description, institution, start_time, deadline, max_budget } = req.body;
    try {
        await db.query(
            'INSERT INTO tenders (title, description, institution, start_time, deadline, max_budget) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, institution, start_time, deadline, max_budget]
        );
        res.redirect('/tenders');
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd podczas dodawania przetargu');
    }
};

exports.showTenderDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const [tenderRows] = await db.query('SELECT * FROM tenders WHERE id = ?', [id]);
        if (tenderRows.length === 0) {
            return res.status(404).send('Przetarg nie znaleziony');
        }

        const tender = tenderRows[0];

        const [bidsRows] = await db.query('SELECT * FROM bids WHERE tender_id = ? ORDER BY value ASC', [id]);

        res.render('tenderDetails', { tender, bids: bidsRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd podczas ładowania przetargu');
    }
};

exports.submitBid = async (req, res) => {
    const { id } = req.params;
    const { bidder_name, value } = req.body;
    const submission_time = new Date();

    try {
        const [tenderRows] = await db.query('SELECT * FROM tenders WHERE id = ?', [id]);
        if (tenderRows.length === 0) {
            return res.status(404).send('Przetarg nie znaleziony');
        }

        const tender = tenderRows[0];
        const now = new Date();

        if (now < new Date(tender.start_time) || now > new Date(tender.deadline)) {
            return res.status(400).send('Przetarg nie jest aktywny');
        }

        await db.query(
            'INSERT INTO bids (tender_id, bidder_name, value, submission_time) VALUES (?, ?, ?, ?)',
            [id, bidder_name, value, submission_time]
        );

        res.redirect(`/tenders/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd podczas składania oferty');
    }
};

exports.listCompleted = async (req, res) => {
    try {
        const [tenders] = await db.query(
            'SELECT * FROM tenders WHERE NOW() > deadline'
        );
        res.render('completedTenders', { tenders });
    } catch (err) {
        res.status(500).send('Błąd serwera');
    }
};

exports.showCompletedTenderDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const [tenderRows] = await db.query('SELECT * FROM tenders WHERE id = ?', [id]);
        if (tenderRows.length === 0) {
            return res.status(404).send('Przetarg nie znaleziony');
        }

        const tender = tenderRows[0];
        const [bidsRows] = await db.query(
            'SELECT * FROM bids WHERE tender_id = ? AND value <= ? ORDER BY value ASC',
            [id, tender.max_budget]
        );

        if (bidsRows.length === 0) {
            return res.render('completedTenderDetails', { tender, bids: [], noWinner: true });
        }

        res.render('completedTenderDetails', { tender, bids: bidsRows, noWinner: false });
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd podczas ładowania przetargu');
    }
};