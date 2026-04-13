'use client';

import Breadcrumb from './Breadcrumb';

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions = null,
  freshness = null,
}) {
  return (
    <header className="pageHeader pageHeaderUnified">
      <div className="pageHeaderMain">
        <Breadcrumb />
        {eyebrow ? <div className="sectionEyebrow">{eyebrow}</div> : null}
        <div className="pageTitleRow">
          <div>
            <h1>{title}</h1>
            {description ? <p className="pageIntro">{description}</p> : null}
          </div>
          {(freshness || actions) ? (
            <div className="pageHeaderMeta">
              {freshness ? <div className="pageFreshness">{freshness}</div> : null}
              {actions ? <div className="pageHeaderActions">{actions}</div> : null}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
