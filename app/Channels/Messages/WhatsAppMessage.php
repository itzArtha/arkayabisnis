<?php
namespace App\Channels\Messages;

class WhatsAppMessage
{
    public string $content;
    public string $contentId;
    public array $media;
    public array $variables;

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

    public function contentId($id): static
    {
        $this->contentId = $id;

        return $this;
    }

    public function variables($key, $value): static
    {
        $this->variables[$key] = $value;

        return $this;
    }
}