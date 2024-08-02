import { Link } from '@inertiajs/react';
import currency from "currency.js";

export default function FormatRupiah({amount}) {
    return (
        <span>{currency(amount, {symbol: 'Rp', separator: '.', precision: 0}).format()}</span>
    );
}
