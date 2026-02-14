import Breadcrumbs, { type BreadcrumbItem } from "./breadcrumbs";

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <Breadcrumbs items={breadcrumbs} />
    </div>
  );
}
