"use client"

import { useId, useState } from "react"
import { CheckIcon, ImagePlusIcon, XIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCharacterLimit } from "@/hooks/use-character-limit"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MdEditSquare } from "react-icons/md";
import { useSession } from "@/lib/auth-client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUpdateUser, useUser } from "@/actions/api/user"
import { toast } from "sonner"
import { useTopLoader } from "nextjs-toploader"
import { useForm } from "react-hook-form"
import { updateUserSchema, UserUpdateFormData } from "@/schema/user/updateUser.schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

// Pretend we have initial image files

export default function EditProfile({user}: any) {
  const id = useId()
  const personalFields : (keyof UserUpdateFormData)[] = ["firstname", "lastname", "dateOfBirth", "bio"]
  const contactFields : (keyof UserUpdateFormData)[] = ["phoneNumber", "address", "city", "country", "postalCode"]



  const maxLength = 180
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue:"",
  })

  if(!user) return null
  const { mutate, isPending } = useUpdateUser(user.id)
  const loader = useTopLoader()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // const dateOfBirth = new Date(user.dateOfBirth).toISOString().split('T')[0]
  
  const form = useForm<UserUpdateFormData>({
    resolver: zodResolver(updateUserSchema),
    mode: "onBlur",
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      dateOfBirth: new Date(user.dateOfBirth),
      address: user.address,
      bio: user.bio,
      city: user.city,
      country: user.country,
      image: user.image,
      phoneNumber: user.phoneNumber,
      postalCode: user.postalCode
    },
  })
  const hasPersonalErrors = personalFields.some((field) => form.formState.errors[field])
  const hasContactErrors = contactFields.some((field) => form.formState.errors[field])

  const handleSubmit = (data: UserUpdateFormData) => {
    mutate(data, {
      onError: (error) => {
        toast(error.message)
      },
      onSuccess: (data) => {
        toast("Profil mis à jour avec succès")
        setIsDialogOpen(false)
      }
    })

  }



  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogTrigger asChild>
    <Button variant="default">
      <MdEditSquare /> Modifier
    </Button>
  </DialogTrigger>
    <DialogContent className="flex flex-col gap-0 overflow-y-auto p-0 sm:max-w-lg [&>button:last-child]:top-3.5 h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Modifier le profil
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Modifier votre profil ici
        </DialogDescription>

        <div className="overflow-y-auto">
          <ProfileBg />
          <Avatar />

          {/* Tabs */}
          <Tabs defaultValue="personal" className="px-6 pt-4 pb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal" className={cn("relative", hasPersonalErrors && "border-b-1 border-red-20 bg-rose-200")}>
                Informations personnelles
                {hasPersonalErrors && (
                  <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-500" />
                )}
              </TabsTrigger>
              <TabsTrigger value="contact" className={cn("relative", hasContactErrors && "border-b-1 border-red-20 bg-rose-200")}>
                Coordonnées
                {hasContactErrors && (
                  <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-500" />
                )}
              </TabsTrigger>
            </TabsList>

            {/* Tab 1 - Infos personnelles */}
            <TabsContent value="personal">
              <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <div className="flex-1">
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input
                              id={`${id}-first-name`}
                              type="text"
                              placeholder="Nom..."
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormItem />
                        </FormItem>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <div className="flex-1">
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input
                              id={`${id}-last-name`}
                              type="text"
                              placeholder="Prénom..."
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormItem />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <div className="flex-1">
                      <FormItem>
                        <FormLabel>Date de naissance</FormLabel>
                        <FormControl>
                          <Input
                            id={`${id}-date-of-birth`}
                            type="date"
                            placeholder="Date de naissance..."
                            {...field}
                            value={field.value?.toISOString().split('T')[0] ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormItem />
                      </FormItem>
                    </div>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <div className="flex-1">
                      <FormItem>
                        <FormLabel>Biographie</FormLabel>
                        <FormControl>
                          <div>
                            <Textarea
                              id={`${id}-bio`}
                              placeholder="Biographie..."
                              maxLength={maxLength}
                              aria-describedby={`${id}-description`}
                              {...field}
                              value={field.value ?? ""}
                            />
                            <p
                              id={`${id}-description`}
                              className="text-muted-foreground mt-2 text-right text-xs"
                              role="status"
                              aria-live="polite"
                            >
                              <span className="tabular-nums">{limit - characterCount}</span>{" "}
                              caractères restants
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                        <FormItem />
                      </FormItem>
                    </div>
                  )}
                />

              </div>
            </TabsContent>

            {/* Tab 2 - Coordonnées */}
            <TabsContent value="contact">
              <div className="space-y-4">
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <div className="flex-1">
                      <FormItem>
                        <FormLabel>Numéro de téléphone</FormLabel>
                        <FormControl>
                          <Input
                            id={`${id}-phone`}
                            type="tel"
                            placeholder="Ex: +261..."
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormItem />
                      </FormItem>
                    </div>
                  )}
                />

                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <div className="flex-1">
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input
                            id={`${id}-address`}
                            type="text"
                            placeholder="Votre adresse..."
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormItem />
                      </FormItem>
                    </div>
                  )}
                />

                <div className="flex flex-col gap-4 sm:flex-row">
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <div className="flex-1">
                        <FormItem>
                          <FormLabel>Ville</FormLabel>
                          <FormControl>
                            <Input
                              id={`${id}-city`}
                              type="text"
                              placeholder="Ville..."
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormItem />
                        </FormItem>
                      </div>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <div className="flex-1">
                        <FormItem>
                          <FormLabel>Code postal</FormLabel>
                          <FormControl>
                            <Input
                              id={`${id}-postal`}
                              type="text"
                              placeholder="Code postal..."
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormItem />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
                
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <div className="flex-1">
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <Input
                              id={`${id}-country`}
                              type="text"
                              placeholder="Pays..."
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormItem />
                        </FormItem>
                      </div>
                    )}
                  />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        

        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button variant="outline">
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending} aria-disabled={isPending} className="cursor-pointer">Modifier</Button>
        </DialogFooter>
        </form>
      </Form>
    </DialogContent>
</Dialog>

  )
}

function ProfileBg() {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      initialFiles: undefined,
    })

  const currentImage = files[0]?.preview || null

  return (
    <div className="h-32">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        {currentImage && (
          <img
            className="size-full object-cover"
            src={currentImage}
            alt={
              files[0]?.preview
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
            onClick={openFileDialog}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlusIcon size={16} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
        name="image"
      />
    </div>
  )
}

function Avatar() {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    initialFiles: undefined,
  })

  const currentImage = files[0]?.preview || null

  return (
    <div className="-mt-10 px-6">
      <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="size-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        <button
          type="button"
          className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
          onClick={openFileDialog}
          aria-label="Change profile picture"
        >
          <ImagePlusIcon size={16} aria-hidden="true" />
        </button>
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  )
}
