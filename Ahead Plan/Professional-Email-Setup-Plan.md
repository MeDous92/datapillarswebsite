# DataPillars Professional Email Setup Plan

Prepared: 15 September 2026  
Domain: `datapillars.ae`  
DNS provider: Tasjeel

## Recommendation

Use **Microsoft 365 Business Basic** for the two founder mailboxes unless the team is firmly committed to Gmail and Google Drive. It provides professional Exchange Online mailboxes plus Outlook, Teams and the wider Microsoft business ecosystem; that is a natural fit for consulting proposals, client calendars and future Microsoft Bookings use. Google Workspace Business Starter is a sound alternative if the team prefers the Gmail interface.

Check the provider's current UAE pricing, billing currency, tax and renewal terms immediately before purchase. Do not purchase a separate Tasjeel cPanel hosting package just to obtain email; the website is already hosted independently.

## Target address model

### Licensed personal mailboxes

- `mohamed.abdo@datapillars.ae`
- `mike.spence@datapillars.ae`

Each founder should have a separate account and license. Never share passwords.

### Shared business addresses

Create these as shared mailboxes or aliases after the two main accounts work:

- `hello@datapillars.ae` — general enquiries; both founders receive it.
- `enquiries@datapillars.ae` — website and assessment enquiries; both founders receive it.
- `privacy@datapillars.ae` — privacy/data-subject requests; assign an owner.
- `accounts@datapillars.ae` — add only when finance processing requires it.

Keep the public website reply path role-based (`enquiries@`) even though the founders reply from their named accounts. This avoids changing the form every time responsibilities change.

## Microsoft 365 implementation sequence

### 1. Create and secure the tenant

1. Purchase two Microsoft 365 Business Basic licenses directly from Microsoft or a reputable UAE partner.
2. Create the tenant using a company-controlled recovery method.
3. Keep a dedicated admin-only account separate from everyday email.
4. Turn on MFA/security defaults before inviting normal use.
5. Assign ordinary, non-admin accounts to Mohamed and Mike.
6. Store recovery codes in the company's password manager—not in either mailbox.

### 2. Verify `datapillars.ae`

1. In Microsoft 365 Admin Center, open **Settings → Domains → Add domain**.
2. Enter `datapillars.ae`.
3. Microsoft will provide a TXT ownership-verification value.
4. In Tasjeel DNS Manager, add that TXT record exactly as Microsoft provides it.
5. Leave the website records untouched:
   - apex/root A record used by the website;
   - `www` CNAME used by the website.
6. Return to Microsoft and complete verification.

Tasjeel may represent the root host as blank, `@`, or `datapillars.ae.`. Follow the format shown by its existing root records. A trailing dot in a destination can denote a complete domain name; use the exact format accepted by the Tasjeel form.

### 3. Create both users before moving mail

Create and license:

- Mohamed Abdo → `mohamed.abdo@datapillars.ae`
- Mike Spence → `mike.spence@datapillars.ae`

Sign into both accounts, complete MFA and test internal messages before changing the MX record.

### 4. Move incoming email to Microsoft 365

Microsoft will display the required MX and related DNS records for this specific tenant. Copy those values; do not rely on values from a generic tutorial.

At the planned cutover:

1. Remove or replace the existing Tasjeel MX record pointing to `dallah.tasjeel.ae` when Microsoft instructs you to do so.
2. Add Microsoft's MX record at the root with the exact priority shown.
3. Add the required Autodiscover CNAME and any service records the Microsoft setup wizard requests.
4. Keep the website A and `www` CNAME records unchanged.
5. Wait for DNS propagation, then test incoming and outgoing mail from external accounts.

Changing MX records affects email routing, not the website. Do not delete unrelated DNS records.

## Email authentication and deliverability

Set up all three controls after mail flow works:

### SPF

SPF identifies approved sending services. A domain must have **one** SPF TXT policy, not a separate SPF record for every sender. Microsoft provides its required include value. If another service later sends from the root domain, merge it carefully into the same policy or isolate that service on a subdomain.

### DKIM

Enable DKIM in Microsoft 365. Microsoft will provide two tenant-specific CNAME records. Add both in Tasjeel, wait for resolution, then enable signing in the Microsoft admin portal.

### DMARC

Add a `_dmarc` TXT record after SPF and DKIM align. Roll out deliberately:

1. Start with monitoring policy `p=none` and send aggregate reports to a controlled mailbox or reporting service.
2. Review legitimate sending sources for several weeks.
3. Move to `p=quarantine` when all valid mail aligns.
4. Move to `p=reject` only after confirming no legitimate system is failing authentication.

The exact DMARC reporting address and policy should be approved by the person who will review reports. A strict record that nobody monitors is not a complete control.

## Keep transactional website email separate

Resend sends the website's form notifications; it does **not** create the two human mailboxes.

Recommended production structure:

1. In Resend, add a sending subdomain such as `notify.datapillars.ae`.
2. Add the SPF and DKIM records Resend provides for that subdomain in Tasjeel.
3. Verify the subdomain in Resend.
4. Configure the site sender as `DataPillars Website <website@notify.datapillars.ae>`.
5. Configure the recipient as `enquiries@datapillars.ae` after that shared address exists.
6. Keep the visitor's email as the message `Reply-To`; never use the visitor as the From address.
7. Keep the Resend API key only in hosted secrets and local `.env.local`; never commit it to GitHub.

Using a subdomain isolates the reputation and DNS of automated form mail from founder-to-client correspondence. Resend also recommends subdomains for this purpose.

Until the professional mailboxes and Resend domain are verified, the site can use Resend's onboarding sender to deliver only to the Google address associated with the Resend account. This is a launch bridge, not the final professional configuration.

## Security controls

- Require MFA for both founders and every administrator.
- Use unique long passwords stored in a password manager.
- Use normal accounts for normal work and admin-only accounts for administration.
- Keep the number of administrators minimal and apply least privilege.
- Review mailbox forwarding rules and sign-in alerts monthly.
- Do not auto-forward business mail to personal Gmail accounts after cutover.
- Keep at least two controlled recovery methods and document account recovery.
- Remove access immediately when a team member or supplier no longer needs it.
- Review shared-mailbox membership quarterly.

## Acceptance test

Do not call the migration complete until all checks pass:

- both founders can sign in with MFA;
- external Gmail/Outlook accounts can send to both founder addresses;
- both founders can send externally without spam placement in the test accounts;
- replies return to the correct mailbox;
- `hello@` and `enquiries@` reach both designated owners;
- calendars can send and receive external invitations;
- SPF passes;
- DKIM passes;
- DMARC reports are being received and reviewed;
- the website enquiry form reaches the intended shared mailbox;
- replying to a form notification addresses the visitor;
- website and `www` remain available after every DNS change.

## DNS change log template

Record each change before saving it in Tasjeel:

| Date/time (GST) | Record type | Host | Old value | New value | Purpose | Owner | Verified |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

Never delete a record simply because it looks unfamiliar. Resolve its purpose first.

## Official reference material

- [Add a custom domain to Microsoft 365](https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain?view=o365-worldwide)
- [Admin account security in Microsoft 365 for business](https://learn.microsoft.com/en-us/microsoft-365/admin/security-and-compliance/m365b-account-security-admins?view=o365-worldwide)
- [Set up multifactor authentication for Microsoft 365](https://learn.microsoft.com/en-us/microsoft-365/admin/security-and-compliance/set-up-multi-factor-authentication?view=o365-worldwide)
- [How email authentication works in Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-about)
- [Google Workspace MX setup](https://support.google.com/a/answer/6156494)
- [Resend domain verification and authentication](https://resend.com/docs/dashboard/domains/introduction)
- [How Resend sender addresses work](https://resend.com/docs/knowledge-base/how-do-I-create-an-email-address-or-sender-in-resend)

