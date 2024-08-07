<?php
namespace App\Channels\Messages;

class WhatsAppMessage
{
    public $content;
    public $media;

    public function content($content)
    {
        $this->content = $content;

        return $this;
    }

    public function media($media)
    {
        $this->media = $media;

        return $this;
    }
}