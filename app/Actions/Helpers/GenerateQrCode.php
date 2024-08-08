<?php

namespace App\Actions\Helpers;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;
use Lorisleiva\Actions\Concerns\AsAction;

class GenerateQrCode
{
    use AsAction;

    public function handle(string $content): string
    {
        return Builder::create()
            ->writerOptions([])
            ->data($content)
            ->encoding(new Encoding('UTF-8'))
            ->errorCorrectionLevel(ErrorCorrectionLevel::High)
            ->size(300)
            ->margin(10)
            ->logoPath(public_path('/images/logo/barcode.png'))
            ->logoResizeToWidth(120)
            ->roundBlockSizeMode(RoundBlockSizeMode::Margin)
            ->validateResult(false)
            ->build()
            ->getDataUri();
    }
}
