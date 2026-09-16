'use client';

import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import {
  buildFacebookShareUrl,
  buildLinkedInShareUrl,
  buildTwitterShareUrl,
  canUseNativeShare,
  copyTextToClipboard,
  getKakaoJavascriptKey,
  getSharePageUrl,
  shareKakao,
  shareNative,
} from '@FsdShared/share/lib/share-links';
import { ResponsiveDialog } from '@FsdShared/sheet/ui';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  homeDict: DictionaryHome;
  shareTitle: string;
  shareDescription: string;
}

export default function PortfolioShareDialog({ open, onClose, homeDict, shareTitle, shareDescription }: Props) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (!open) {
      setCopied(false);
      return;
    }

    setShareUrl(getSharePageUrl());
  }, [open]);

  const handleCopyUrl = async () => {
    const url = shareUrl || getSharePageUrl();
    const success = await copyTextToClipboard(url);
    setCopied(success);
  };

  const handleNativeShare = async () => {
    const url = shareUrl || getSharePageUrl();
    const shared = await shareNative({
      title: shareTitle,
      text: shareDescription,
      url,
    });

    if (shared) {
      onClose();
    }
  };

  const handleKakaoShare = async () => {
    const url = shareUrl || getSharePageUrl();
    await shareKakao({
      title: shareTitle,
      description: shareDescription,
      url,
    });
  };

  const snsItems = [
    getKakaoJavascriptKey()
      ? {
          id: 'kakao',
          label: homeDict.share.kakao,
          className: 'bg-[#FEE500] text-[#191919] hover:opacity-90',
          onClick: handleKakaoShare,
        }
      : null,
    {
      id: 'facebook',
      label: homeDict.share.facebook,
      className: 'bg-[#1877F2] text-white hover:opacity-90',
      onClick: () => {
        window.open(buildFacebookShareUrl(shareUrl || getSharePageUrl()), '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'twitter',
      label: homeDict.share.twitter,
      className: 'bg-foreground text-background hover:opacity-90',
      onClick: () => {
        window.open(buildTwitterShareUrl(shareUrl || getSharePageUrl(), shareTitle), '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'linkedin',
      label: homeDict.share.linkedin,
      className: 'bg-[#0A66C2] text-white hover:opacity-90',
      onClick: () => {
        window.open(buildLinkedInShareUrl(shareUrl || getSharePageUrl()), '_blank', 'noopener,noreferrer');
      },
    },
  ].filter(Boolean) as Array<{
    id: string;
    label: string;
    className: string;
    onClick: () => void;
  }>;

  return (
    <ResponsiveDialog
      open={open}
      onClose={onClose}
      title={homeDict.share.title}
      closeLabel={homeDict.settings.close}
      ariaLabel={homeDict.share.title}
      backdropLabel={homeDict.settings.close}
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {homeDict.share.copyUrl}
          </p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={shareUrl}
              className="min-w-0 flex-1 truncate rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
            />
            <button
              type="button"
              onClick={handleCopyUrl}
              className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {copied ? homeDict.share.copied : homeDict.share.copyUrl}
            </button>
          </div>
        </div>

        {canUseNativeShare() ? (
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex w-full items-center justify-center rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {homeDict.share.native}
          </button>
        ) : null}

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{homeDict.share.sns}</p>
          <div className="grid grid-cols-2 gap-2">
            {snsItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className={mergeClassNames(
                  'rounded-xl px-3 py-3 text-sm font-medium transition-opacity',
                  item.className
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ResponsiveDialog>
  );
}
