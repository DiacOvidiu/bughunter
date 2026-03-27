import { set, useDocumentOperation, useFormValue } from "sanity";
import type { BooleanInputProps } from "sanity";

export function PublishToggle(props: BooleanInputProps) {
  const { value, onChange, readOnly } = props;

  const documentId = useFormValue(["_id"]) as string | undefined;
  const documentType = useFormValue(["_type"]) as string | undefined;

  const rawId = (documentId ?? "").replace(/^drafts\./, "") || "placeholder";
  const { publish, unpublish } = useDocumentOperation(
    rawId,
    documentType ?? "blogPost"
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    onChange(set(checked));

    if (checked) {
      if (!publish.disabled) {
        publish.execute();
      }
    } else {
      if (!unpublish.disabled) {
        unpublish.execute();
      }
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <input
        id="isPublished-toggle"
        type="checkbox"
        checked={!!value}
        onChange={handleChange}
        disabled={!!readOnly}
        style={{ width: "1rem", height: "1rem", cursor: readOnly ? "not-allowed" : "pointer" }}
      />
      <span style={{ fontSize: "0.8125rem", color: value ? "inherit" : "#888" }}>
        {value ? "Publicat — vizibil pe site" : "Draft — ascuns de pe site"}
      </span>
    </div>
  );
}
