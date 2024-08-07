<?php
namespace App\Channels\Messages;

class WhatsAppMessage
{
    public string $content;
    public array $media;

    public function content($content): static
    {
        $this->content = $content;

        return $this;
    }

    public function media($media): static
    {
        $this->media = $media;

        return $this;
    }
}
